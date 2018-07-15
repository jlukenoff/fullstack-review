const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const mongoose = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ type: 'application/x-www-form-urlencoded' }));


const getContribs = function(repoName, owner) {
  github.getContributorsByReponame(repoName, (err, resp) => {
    if (err) throw err;
    let results = JSON.parse(resp.body);
    for (let i = 0; i < results.length; i++) {
      mongoose.saveContributor(results[i], owner, (err, doc) => {
        if (err) throw err;
      });
    }
  })
}


app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.term, (err, resp) => {
    if (err) throw err;
    let data = JSON.parse(resp.body);
    if (data.message === 'Not Found') {
      res.writeHead(201);
      res.end('non-existent');
    }
    let results = [];
    for (let index = 0; index < data.length; index++) {
      let repo = data[index];
      mongoose.save(repo, (err, repo) => {
        if (err) throw err;
        getContribs(repo._doc.full_name, repo._doc.owner);
        results.push(repo._doc);
        if (index === data.length - 1) {
          mongoose.get((err, docs) => {
            if (err) throw err;
            res.writeHead(201);
            res.end(JSON.stringify({repos: docs, newReps: results.length}));
          });
        }
      });
    };
  });
});

app.get('/repos', (req, res) => {
  mongoose.get((err, docs) => {
    if (err) throw err;
    let results = docs.slice(0, 25);
    res.writeHead(200);
    res.end(JSON.stringify({results: results, count: docs.length}));
  });
});

app.get('/friends', (req, resp) => {
  let user = req.query.name;
  mongoose.getFriends(user, (err, docs) => {
    let results = docs.filter(friend => friend.name !== user);
    resp.writeHead(200);
    resp.end(JSON.stringify(results));
  });

})

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github').getReposByUsername;
const mongoose = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ type: 'application/x-www-form-urlencoded' }));

app.post('/repos', function (req, res) {
  github(req.body.term, (err, resp) => {
    if (err) throw err;
    let data = JSON.parse(resp.body);
    if (data.message === 'Not Found') {
      res.writeHead(201);
      res.end('non-existent');
    }
    let results = [];
    for (let index = 0; index < data.length; index++) {
      let repo = data[index];
      //save all results not alreadt stored
      mongoose.save(repo, (err, repo) => {
        if (err) {
          throw err;
        }
        results.push(repo._doc);
        if (index === data.length - 1) {
          //get all repos in descending order of fork count
          mongoose.get((err, docs) => {
            if (err) throw err;
            res.writeHead(201);
            // send results back to client
            res.end(JSON.stringify(docs));
          });
        }
      });
    };
  });
});

app.get('/repos', function (req, res) {
  mongoose.get((err, docs) => {
    if (err) throw err;
    let results = docs.slice(0, 25);
    res.writeHead(200);
    res.end(JSON.stringify({results: results, count: docs.length}));
  });
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


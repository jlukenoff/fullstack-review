const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github').getReposByUsername;
const mongoose = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ type: 'application/x-www-form-urlencoded' }));

app.post('/repos', function (req, res) {
  github(req.body.term, (err, resp, body) => {
    if (err) throw err;
    let data = JSON.parse(resp.body);
    let results = [];
    data.forEach((repo) => {
      mongoose.save(repo, (err, repo) => {
        if (err) throw err;
        results.push(repo._doc);
        if (results.length === data.length) {
          console.log('all repos saved to db');
          mongoose.get((err, docs) => {
            if (err) throw err;
            let results = docs.slice(0, 25);
            res.writeHead(201);
            res.end(JSON.stringify(results));
          });
        }
      });
    });
  });
});

app.get('/repos', function (req, res) {
  console.log('request received');
  mongoose.get((err, docs) => {
    if (err) throw err;
    let results = docs.slice(0, 25);
    res.writeHead(200);
    res.end(JSON.stringify(results));
  });
});

app.listen(1157, function() {
  console.log(`listening on port 1157`);
});


const request = require('request');
let token = process.env.TOKEN || require('../config.js').TOKEN;

let getReposByUsername = (username, cb) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  request(options, cb);
}


let getContributorsByReponame = (repoName, cb) => {
  console.log(repoName);
  let options = {
    url: `https://api.github.com/repos/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  request(options, cb);
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.getContributorsByReponame = getContributorsByReponame;
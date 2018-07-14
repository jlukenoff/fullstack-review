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

module.exports.getReposByUsername = getReposByUsername;
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'repositories'
});

connection.connect();

let save = function(repo, cb) {
  let queryString = `insert into repos set ?`
  let params = {
    name: repo.name,
    owner: repo.owner.login,
    description: repo.descritpion,
    url: repo.html_url,
    forksCount: repo.forks,
    defaultBranch: repo.default_branch,
    avatarUrl: repo.owner.avatar_url,
    fullName: repo.full_name
  }
  connection.query(queryString, params, cb);
}

let get = function(cb) {
  connection.query('select * from repos', cb);
}



module.exports.save = save;
module.exports.get = get;
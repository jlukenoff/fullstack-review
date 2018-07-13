const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher', { useMongoClient: true });

let repoSchema = mongoose.Schema({
  name: {type: String, unique: true},
  owner: String,
  description: String,
  url: String,
  forksCount: Number,
  defaultBranch: String,
  avatar_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, cb) => {
  let repo = new Repo({
    name: repoData.name,
    owner: repoData.owner.login,
    description: repoData.description,
    url: repoData.html_url,
    forksCount: repoData.forks_count,
    defaultBranch: repoData.default_branch,
    avatar_url: repoData.owner.avatar_url
  });

  repo.save(cb);
}

let get = (cb) => {
  Repo.find().sort('-forksCount').exec(cb);
}

module.exports.save = save;
module.exports.get = get;
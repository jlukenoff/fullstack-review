const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher', { useMongoClient: true });

let repoSchema = mongoose.Schema({
  name: String,
  full_name: String,
  description: String,
  url: String,
  forksCount: Number,
  defaultBranch: String,
  avatar_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, cb) => {
  console.log(repoData);
  let repo = new Repo({
    name: repoData.name,
    full_name: repoData.full_name,
    description: repoData.description,
    url: repoData.html_url,
    forksCount: repoData.forks_count,
    defaultBranch: repoData.default_branch,
    avatar_url: repoData.owner.avatar_url
  });

  repo.save(cb);
}

module.exports.save = save;
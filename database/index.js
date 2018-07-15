const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URI || 'mongodb://localhost:27017/fetcher'}`, { useMongoClient: true });

let repoSchema = mongoose.Schema({
  name: {type: String, unique: true},
  owner: String,
  owner_url: String,
  description: String,
  url: String,
  forksCount: Number,
  defaultBranch: String,
  avatar_url: String,
  full_name: String
});

let ContributorSchema = mongoose.Schema({
  friend: String,
  name: String,
  avatar_url: String,
  contributions: Number,
  prof_url: String
});

let Contrib = mongoose.model('Contributor', ContributorSchema);

let saveContributor = (contributor, friend, cb) => {
  let contrib = new Contrib({
    friend: friend,
    name: contributor.login,
    avatar_url: contributor.avatar_url,
    contributions: contributor.contributions,
    prof_url: contributor.html_url
  });
  contrib.save(cb);
}

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, cb) => {
  let repo = new Repo({
    name: repoData.name,
    owner: repoData.owner.login,
    owner_url: repoData.owner.html_url,
    description: repoData.description,
    url: repoData.html_url,
    forksCount: repoData.forks_count,
    defaultBranch: repoData.default_branch,
    avatar_url: repoData.owner.avatar_url,
    full_name: repoData.full_name
  });

  repo.save(cb);
}

let get = (cb) => {
  Repo.find().sort('-forksCount').exec(cb);
}

let getFriends = (user, cb) => {
  Contrib.find({friend: user}).limit(15).exec(cb);
}

module.exports.save = save;
module.exports.get = get;
module.exports.saveContributor = saveContributor;
module.exports.getFriends = getFriends;
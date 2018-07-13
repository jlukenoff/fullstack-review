import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {/* map repo list to elements here */}
    There are {props.repos.length} repos.
  </div>
)

export default RepoList;
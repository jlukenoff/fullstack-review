import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <table id="repo-table">
      <tbody>
      {props.repos.map(repo => (
        <tr key={repo.name}>
          <td><a href={repo.url}>{repo.name}</a></td>
          <td>Forks: {repo.forksCount}</td>
          {/* <td>{repo.owner}</td>
          <td>{repo.description}</td>
          <td>{repo.url}</td>
          <td>{repo.description}</td>
          
          <td>{repo.defaultBranch}</td>
          {/* <td><img src={repo.avatar_url} alt="user photo" className="avatar"/></td> */}
         
        </tr>
      )
      )}
      </tbody>
    </table>
    Showing {props.repos.length} of {props.count} repos.
  </div>
)

export default RepoList;
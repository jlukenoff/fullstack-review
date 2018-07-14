import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <table id="repo-table">
      <tbody>
        <tr>
          <th>Author</th>
          <th>Repo</th>
          <th>Forks</th>
          <th>Description</th>
          <th>Branch</th>
        </tr>
      {props.repos.map(repo => (
        <tr key={repo.name}>
          <td><img src={repo.avatar_url} alt="user photo" className="avatar"/><br/>{repo.owner}</td>
          <td className="reponame"><a href={repo.url}>{repo.name}</a></td>
          <td>{repo.forksCount}</td>
          <td>{repo.description || <i>No desciption provided</i>}</td>
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
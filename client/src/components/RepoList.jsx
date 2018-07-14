import React from 'react';

const RepoList = (props) => {
  let renderedCount = 0;  
  
  return (
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
        {props.repos.map((repo, index) => {
        if ((props.user && repo.owner !== props.user && renderedCount <= 10) || (props.user && repo.owner === props.user && renderedCount >= 10)) {
          return null;
        }
        renderedCount++;

        
        return ( 
        <tr key={repo.name}>
            <td><img src={repo.avatar_url} alt="user photo" className="avatar"/><br/>{repo.owner}</td>
            <td className="reponame"><a href={repo.url}>{repo.name}</a></td>
            <td>{repo.forksCount}</td>
            <td>{repo.description || <i>No desciption provided</i>}</td>
            <td>{repo.defaultBranch}</td>
          </tr>
        )
        }
        )}
        </tbody>
      </table>
      <p>Showing {renderedCount} of {props.count} repos.</p>
      {props.new ? <p id="added-msg">{props.new} repos added. {props.count} repos updated</p> : null}
    </div>
  )
}

export default RepoList;
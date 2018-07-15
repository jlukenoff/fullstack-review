import React from 'react';
import Friends from './Friends.jsx';

const RepoList = (props) => {
  let renderedCount = 0;  
  
  return (
    <div>
      <h4> Repo List Component </h4>
      <table id="repo-table" className={props.friends.length > 0 ? 'profile-display': null}>
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
            <td><a href={repo.owner_url}><img src={repo.avatar_url} alt="user photo" className="avatar"/></a><br/>{repo.owner}</td>
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
      {props.friends.length > 0 ? <Friends friends={props.friends} /> : null}
      <p>Showing {renderedCount} of {props.count} repos.</p>
      {props.new ? <p id="added-msg">{props.new} new repos imported. {props.count} repos updated</p> : null}
    </div>
  )
}

export default RepoList;
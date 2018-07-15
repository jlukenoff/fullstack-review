import React from 'react';

const Friends = (props) => {
  return (
    <table id="friends">
      <tbody>
        <tr>
          <th>Friends</th>
        </tr>
      {props.friends.map(friend => (
        <tr key={friend.name}>
          <td className="friends-list-item"><a href={friend.prof_url}><img src={friend.avatar_url} className="avatar"/><br/>{friend.name}</a></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Friends;
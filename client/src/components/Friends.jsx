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
          <td>{friend.name}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Friends;
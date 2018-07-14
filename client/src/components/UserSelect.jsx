import React from 'react';

const UserSelect = (props) => {
  
  
  return (
    <select onChange={(e) => props.change(e.target.value)}>
      <option>Display All</option>
      {props.users.map(user => (
        <option key={user}>{user}</option>
      ))}
    </select>
  )
};

export default UserSelect;
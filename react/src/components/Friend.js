import React from 'react'

const Friend = props => {
  return(
    <span key={props.id}>
      {props.friendName}
      <button
        className="removeFriendButton"
        id={props.id}
        onClick={props.removeFriend}
        >
        X
      </button>
      <br />
    </span>
  )
}

export default Friend

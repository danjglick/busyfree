import React from 'react'

const UserAccountSettings = props => {
  return(
    <div className="settingsContent"> <br />
      <div> welcome, {props.userName} </div> <br />
      <a onClick={props.signOut}> sign-out </a>
    </div>
  )
}

export default UserAccountSettings

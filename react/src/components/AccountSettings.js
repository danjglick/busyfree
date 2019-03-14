import React, {Component} from 'react'

const AccountSettings = props => {
  if (props.clickedHeading != "Account") {
    return null
  }
  return(
    <div className="settingsContent">
      <a className="signout" href='/'>
        Sign out
      </a>
    </div>
  )
}

export default AccountSettings

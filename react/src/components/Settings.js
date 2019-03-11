import React from 'react'
import FriendsList from '../containers/FriendsList'

const Settings = props => {
  let urlSplit = window.location.href.split('/')
  let userId = urlSplit[urlSplit.length - 2]
  let homeUrl = `/users/${userId}`

  return(
    <div>
      <br/>
      <a href={homeUrl}> Back </a>
      <br/> <hr/>
      <h1> Friends </h1>
      <div className="settingsContent">
        <FriendsList/>
      </div>
      <br/> <hr/>
      <h1> Account </h1>
      <div className="settingsContent">
        <a className="signout" href='/'> Sign out </a>
      </div>
      <br/> <hr/>
      <h1> About </h1>
      <div className="settingsContent">
        <p> BusyFree is a simpler way to connect with friends. </p>
        <p> Search for them by full name or phone number. Click the big gold button whenever you&apos;re free. We&apos;ll notify you whenever you and your friends are free at the same time. </p>
        <p> Copyright 2019. Dan Glick (danjglick@gmail.com). All rights reserved. </p>
      </div>
      <br/> <hr/>
    </div>
  )
}

export default Settings

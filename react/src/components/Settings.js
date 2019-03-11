import React from 'react'
import FriendsList from '../containers/FriendsList'

const Settings = props => {
  let urlSplit = window.location.href.split('/')
  let userId = urlSplit[urlSplit.length - 2]
  let homeUrl = `/users/${userId}`

  return(
    <div>
      <a href={homeUrl}> Back </a>
      <FriendsList/>
      <h1> Account </h1>
      <a className="signout" href='/'> Sign out </a>
      <h1> About </h1>
      <p> BusyFree is the simplest way to connect with friends. </p>
      <p> Search for them by full name or phone number. Click the big gold button whenever you&apos;re free. We&apos;ll notify you whenever you and your friends are free at the same time. </p>
      <p> Copyright 2019. Dan Glick (danjglick@gmail.com). All rights reserved. </p>
    </div>
  )
}

export default Settings

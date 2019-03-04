import React from 'react'
import FriendsList from '../containers/FriendsList'

const Settings = props => {
  let urlSplit = window.location.href.split('/')
  let userId = urlSplit[urlSplit.length - 2]
  let homeUrl = `/users/${userId}`

  return(
    <div>
      <a href={homeUrl}> Back </a>
      <br/><br/>
      <FriendsList/>
      <h2> About </h2>
      BusyFree is the simplest way to connect with friends.
      <br/><br/>
      Search for them by full name or phone number.
      Click the big gold button whenever you&apos;re free.
      We&apos;ll notify you whenever you and your friends are free at the same time.
      <br/><br/>
      Copyright 2019. Dan Glick (danjglick@gmail.com). All rights reserved.
      <br/><br/><br/><br/>
      <a href='/'> Sign out </a>
    </div>
  )
}

export default Settings

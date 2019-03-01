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
    </div>
  )
}

export default Settings

import React from 'react'
import BusySwitch from '../containers/BusySwitch'

const Home = props => {
  let urlSplit = window.location.href.split('/')
  let userId = urlSplit[urlSplit.length - 1]
  let settingsUrl = `/users/${userId}/edit`

  return(
    <div>
      <BusySwitch/>
      <br/>
      <a href={settingsUrl}> Settings </a>
    </div>
  )
}

export default Home

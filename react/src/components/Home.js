import React from 'react'
import BusySwitch from '../containers/BusySwitch'

const Home = props => {
  let user = JSON.parse(localStorage.user)
  let settingsUrl = `/users/${user.id}/edit`

  return(
    <div>
      <BusySwitch />
      <a
        id="settingsLink"
        href={settingsUrl}
        >
        settings
      </a>
    </div>
  )
}

export default Home

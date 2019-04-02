import React from 'react'
import BusySwitch from '../containers/BusySwitch'

const Home = props => {
  let settingsUrl = `/users/${JSON.parse(localStorage.user).id}/edit`

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

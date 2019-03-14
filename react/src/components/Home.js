import React, {Component} from 'react'
import BusySwitch from '../containers/BusySwitch'

class Home extends Component {
  constructor(props) {
    super(props)
    let urlSplit = window.location.href.split('/')
    this.userId = urlSplit[urlSplit.length - 1]
    this.settingsUrl = `/users/${this.userId}/edit`
  }

  render() {
    return(
      <div>
        <BusySwitch/>
        <a id="settingsLink" href={this.settingsUrl}> Settings </a>
      </div>
    )
  }
}

export default Home

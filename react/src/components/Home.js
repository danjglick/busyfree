import React, {Component} from 'react'
import BusySwitch from '../containers/BusySwitch'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {msg: ''}
    this.promptGuest = this.promptGuest.bind(this)
    this.notify = this.notify.bind(this)
    this.clearNotification = this.clearNotification.bind(this)
  }

  promptGuest() {
    this.setState({msg: 'sign-in to see who else is free!'})
  }

  notify(friend) {
    this.setState({msg: `${friend} is free!`})
  }

  clearNotification() {
    this.setState({msg: ''})
  }

  render() {
    let settingsUrl = `/users/${JSON.parse(localStorage.user).id}/edit`
    return(
      <div className='flexContainer'>
        <div className='notification'> {this.state.msg} </div>
        <BusySwitch
          notify={this.notify}
          promptGuest={this.promptGuest}
          clearNotification={this.clearNotification}
        />
        <a
          id="settingsLink"
          href={settingsUrl}
          >
          settings
        </a>
      </div>
    )
  }
}

export default Home

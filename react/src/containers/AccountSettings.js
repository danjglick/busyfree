import React, {Component} from 'react'
import GuestAccountSettings from '../components/GuestAccountSettings'
import UserAccountSettings from '../components/UserAccountSettings'

class AccountSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {isSignedIn: false}
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1
    )
  }

  tick() {
    if (JSON.parse(localStorage.user).id != 1) {
      this.setState({isSignedIn: true})
    }
  }

  signOut(e) {
    e.preventDefault()
    fetch('/api/v1/users/1')
    .then(response => response.json())
    .then(body => {
      this.setState({isSignedIn: false})
      localStorage.setItem('user', JSON.stringify(body))
    })
    let userId = JSON.parse(localStorage.user).id
    fetch(`/api/v1/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        busyOrFree: 'free'
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
  }

  render() {
    if (this.props.clickedHeading != "Account") {
      return null
    } else if (this.state.isSignedIn == false) {
      return(
        <GuestAccountSettings />
      )
    } else {
      return(
        <UserAccountSettings
          userName={JSON.parse(localStorage.user).name}
          signOut={this.signOut}
        />
      )
    }
  }
}

export default AccountSettings

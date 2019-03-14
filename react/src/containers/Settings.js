import React, {Component} from 'react'
import FriendsList from './FriendsList'
import AccountSettings from '../components/AccountSettings'
import About from '../components/About'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {clickedHeading: ''}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.setState({clickedHeading: event.target.value})
  }

  render() {
    let urlSplit = window.location.href.split('/')
    let userId = urlSplit[urlSplit.length - 2]
    let homeUrl = `/users/${userId}`
    return(
      <div>
        <br />
        <a href={homeUrl}> Back </a>
        <br />
        <button
          className="settingsHeading"
          onClick={this.handleClick}
          value="Friends"
        > Friends
        </button >
        <FriendsList clickedHeading={this.state.clickedHeading} />
        <br />
        <button
          className="settingsHeading"
          onClick={this.handleClick}
          value="Account"
        > Account
        </button>
        <AccountSettings clickedHeading={this.state.clickedHeading} />
        <br />
        <button
          className="settingsHeading"
          onClick={this.handleClick}
          value="About"
        > About
        </button>
        <About clickedHeading={this.state.clickedHeading}/>
        <br />
      </div>
    )
  }
}

export default Settings

import React, {Component} from 'react'
import FriendsList from './friendslist'
import AccountSettings from './accountsettings'
import About from '../components/about'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {clickedHeading: ''}
    this.user = JSON.parse(localStorage.user)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.setState({clickedHeading: e.target.value})
  }

  render() {
    let homeUrl = `/users/${this.user.id}`
    return(
      <div>
        <p>
          <a href={homeUrl}> back </a>
        </p>
        <button
          className="settingsHeading"
          onClick={this.handleClick}
          value="Friends"
          >
          friends
        </button>
        <FriendsList clickedHeading={this.state.clickedHeading} />
        <br />
        <button
          className="settingsHeading"
          onClick={this.handleClick}
          value="Account"
          > account
        </button>
        <AccountSettings clickedHeading={this.state.clickedHeading} />
        <br />
        <button
          className="settingsHeading"
          onClick={this.handleClick}
          value="About"
          > about
        </button>
        <About clickedHeading={this.state.clickedHeading} />
        <br />
      </div>
    )
  }
}

export default Settings

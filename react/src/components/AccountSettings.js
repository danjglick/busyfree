import React, {Component} from 'react'

class AccountSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {WelcomeMsg: ''}
  }

  componentDidMount() {
    let urlSplit = window.location.href.split('/')
    let userId = urlSplit[urlSplit.length - 2]
    if (userId != 1) {
      fetch(`/api/v1/users/${userId}`)
      .then(response => response.json())
      .then(body => {
        this.setState({welcomeMsg: `welcome, ${body.name}`})
      })
    } else {

    }
  }

  render() {
    if (this.props.clickedHeading != "Account") {
      return null
    }
    return(
      <div className="settingsContent">
        <p> {this.state.welcomeMsg} </p>
        <a className="signout" href='/'>
          sign-out
        </a>
      </div>
    )
  }
}

export default AccountSettings

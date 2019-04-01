import React, {Component} from 'react'

class AccountSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {signedIn: false}
  }

  componentDidMount() {
    let urlSplit = window.location.href.split('/')
    let userId = urlSplit[urlSplit.length - 2]
    fetch(`/api/v1/users/${userId}`)
    .then(response => response.json())
    .then(body => {
      if (body.id != 1) {
        this.setState({signedIn: true})
      }
    })
  }

  render() {
    if (this.props.clickedHeading != "Account") {
      return null
    }
    let signInMsg = 'youre signed-in'
    if (!this.state.signedIn) {
      signInMsg = <span>
        <p> sign-up </p>
        <p> sign-in </p>
      </span>
    }
    return(
      <div className="settingsContent">
        <p> {signInMsg} </p>
        <a className="signout" href='/'>
          sign-out
        </a>
      </div>
    )
  }
}

export default AccountSettings

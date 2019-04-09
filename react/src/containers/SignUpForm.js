import React, {Component} from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    fetch('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      localStorage.setItem('user', JSON.stringify(body))
    })
    this.setState({
      name: '',
      password: ''
    })
  }

  render() {
    return(
      <form
        className='settingsContent'
        onSubmit={this.handleSubmit}
      >
        <input
          placeholder='name (first and last)'
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <br />
        <input
          placeholder='password'
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <br />
        <input type="submit" value="sign-up" />
      </form>
    )
  }
}

export default SignUpForm

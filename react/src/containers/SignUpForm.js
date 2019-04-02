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

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
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
      this.setState({
        name: '',
        password: ''
      })
    })
  }

  render() {
    return(
      <form
        className='settingsContent'
        onSubmit={this.handleSubmit}
      >
        <label>
          <input
            placeholder='name (first and last)'
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>
        <br />
        <label>
          <input
            placeholder='password'
            type="text"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </label> <br />
        <input type="submit" value="sign-up" />
      </form>
    )
  }
}

export default SignUpForm

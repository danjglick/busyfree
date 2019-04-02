import React, {Component} from 'react'

class SignInForm extends Component {
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
    fetch('/api/v1/users')
    .then(response => response.json())
    .then(body => {
      for(let i=0; i<body.length; i++) {
        if(
          body[i].name.toUpperCase() == this.state.name.toUpperCase()
          && body[i].password == this.state.password
        ) {
          localStorage.setItem('user', JSON.stringify(body[i]))
        }
      }
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
        <input type="submit" value="sign-in" />
      </form>
    )
  }
}

export default SignInForm

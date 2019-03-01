import React, {Component} from 'react'

class BusySwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busyOrFree: 'busy',
      connectedTo: '',
      notification: ''
    }
    this.busySwitch = this.busySwitch.bind(this)
  }

  getUserId() {
    let urlSplit = window.location.href.split('/')
    return urlSplit[urlSplit.length - 1]
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.getRequest(),
      1000
    )
  }

  getRequest() {
    fetch(`/api/v1/users/${this.getUserId()}`)
    .then(response => response.json())
    .then(body => {
      this.setState({
        busyOrFree: body.busy_or_free,
        connectedTo: body.connected_to
      })
    })
  }

  busySwitch() {
    fetch(`/api/v1/users/${this.getUserId()}`, {
      method: 'PATCH',
      body: JSON.stringify({busyOrFree: this.state.busyOrFree}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        busyOrFree: body.busy_or_free,
        connectedTo: body.connected_to
      })
    })
  }

  render() {
    if(this.state.connectedTo != '') {
      this.setState({
        notification: " wants to hang!"
      })
    }
    return(
      <div>
        <div>{this.state.connectedTo}{this.state.notification}</div>
        <br/>
        <button onClick={this.busySwitch}>
          I am {this.state.busyOrFree}
        </button>
      </div>
    )
  }
}

export default BusySwitch

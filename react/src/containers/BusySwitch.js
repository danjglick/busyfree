import React, {Component} from 'react'

class BusySwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busyOrFree: 'busy',
      connectedTo: '',
      notification: ''
    }
    this.notification = ''
    this.busySwitch = this.busySwitch.bind(this)
  }

  getUserId() {
    let urlSplit = window.location.href.split('/')
    return urlSplit[urlSplit.length - 1]
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    )
  }

  tick() {
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
    if(this.state.connectedTo) {
      this.notification = " is free!"
    } else {
      this.notification = ""
    }
    return(
      <div>
        <div>{this.state.connectedTo}{this.notification}</div>
        <br/>
        <button onClick={this.busySwitch}>
          I am {this.state.busyOrFree}
        </button>
      </div>
    )
  }
}

export default BusySwitch

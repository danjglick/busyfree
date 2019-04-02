import React, {Component} from 'react'

class BusySwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busyOrFree: 'busy',
      connectedTo: ''
    }
    this.user = JSON.parse(localStorage.user)
    this.notification = ''
    this.busyChecked = ''
    this.freeChecked = ''
    this.busySwitch = this.busySwitch.bind(this)
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    )
  }

  tick() {
    fetch(`/api/v1/users/${this.user.id}`)
      .then(response => response.json())
      .then(body => {
        if (this.user.id != 1) {
          this.setState({
            busyOrFree: body.busy_or_free,
            connectedTo: body.connected_to
          })
        }
      })
  }

  busySwitch() {
    fetch(`/api/v1/users/${this.user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        busyOrFree: this.state.busyOrFree
      }),
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
    if(this.state.busyOrFree == "busy") {
      this.busyChecked = "yesChecked"
      this.freeChecked = "noChecked"
    } else {
      this.busyChecked = "noChecked"
      this.freeChecked = "yesChecked"
    }
    if(this.user.id == 1 && this.state.busyOrFree == 'free') {
      this.notification = "Sign-in to see who else is free!"
    }
    return(
      <div>
        <div id="notification">
          {this.state.connectedTo}
          {this.notification}
        </div>
        <button
          className="busySwitch busy"
          id={this.busyChecked}
          onClick={this.busySwitch}
          >
          busy
        </button>
        <button
          className="busySwitch free"
          id={this.freeChecked}
          onClick={this.busySwitch}
          >
          free
        </button>
      </div>
    )
  }
}

export default BusySwitch

import React, {Component} from 'react'

class BusySwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busyOrFree: 'busy',
      connectedTo: ''
    }
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
    if (JSON.parse(localStorage.user).id != 1) {
      fetch(`/api/v1/users/${JSON.parse(localStorage.user).id}`)
      .then(response => response.json())
      .then(body => {
        this.setState({
          busyOrFree: body.busy_or_free,
          connectedTo: body.connected_to
        })
      })
      if (this.state.connectedTo) {
        this.props.notifyUser(this.state.connectedTo)
      } else {
        this.props.clearNotification()
      }
    }
  }

  busySwitch() {
    fetch(`/api/v1/users/${JSON.parse(localStorage.user).id}`, {
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
      if (JSON.parse(localStorage.user).id == 1) {
        if (this.state.busyOrFree == 'free') {
          this.props.promptGuest()
        } else {
          this.props.clearNotification()
        }
      }
    })
  }

  render() {
    if (this.state.busyOrFree == "busy") {
      this.busyChecked = "yesChecked"
      this.freeChecked = "noChecked"
    } else {
      this.busyChecked = "noChecked"
      this.freeChecked = "yesChecked"
    }
    return(
      <div>
        <button
          className="busySwitch busy"
          id={this.busyChecked}
          onClick={this.busySwitch}
          >
          &nbsp;busy&nbsp;
        </button>
        <button
          className="busySwitch free"
          id={this.freeChecked}
          onClick={this.busySwitch}
          >
          &nbsp;free&nbsp;
        </button>
      </div>
    )
  }
}

export default BusySwitch

import React, {Component} from 'react'

class BusySwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {busyOrFree: 'busy', connectedTo: '', notification: ''}
    this.notification = ''
    this.busyChecked = ''
    this.freeChecked = ''
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
      this.setState({busyOrFree: body.busy_or_free, connectedTo: body.connected_to})
    })
  }

  busySwitch() {
    fetch(`/api/v1/users/${this.getUserId()}`, {
      method: 'PATCH',
      body: JSON.stringify({busyOrFree: this.state.busyOrFree}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      credentials: 'same-origin'})
    .then(response => response.json())
    .then(body => {
      this.setState({busyOrFree: body.busy_or_free, connectedTo: body.connected_to})
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
    let curveValue = '1em'
    const leftCorners = {borderRadius: `${curveValue} 0 0 ${curveValue}`, marginLeft: '260px'}
    const rightCorners = {borderRadius: `0 ${curveValue} ${curveValue} 0`, marginRight: '260px'}
    return(
      <div>
        <div className="busySwitch" id="notification"> {this.state.connectedTo}{this.notification} </div>
        <button className="busySwitch" id={this.busyChecked} style={leftCorners} onClick={this.busySwitch}> Busy </button>
        <button className="busySwitch" id={this.freeChecked} style={rightCorners} onClick={this.busySwitch}> Free </button>
      </div>
    )
  }
}

export default BusySwitch

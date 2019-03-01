import React, {Component} from 'react'

class FriendsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friends: [],
      addedFriend: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getUserId() {
    let urlSplit = window.location.href.split('/')
    return urlSplit[urlSplit.length - 2]
  }

  componentDidMount() {
    fetch(`/api/v1/users/${this.getUserId()}`)
    .then(response => response.json())
    .then(body => {
      this.setState({friends: body.friends})
    })
  }

  handleChange(event) {
    this.setState({addedFriend: event.target.value});
  }

  handleSubmit(event) {
    fetch(`/api/v1/users/${this.getUserId()}`, {
      method: 'PATCH',
      body: JSON.stringify({addedFriend: this.state.addedFriend}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      this.setState({friends: body.friends})
    })
  }

  render() {
    let friends = this.state.friends.map(friend => {
      return(
        <li>{friend}</li>
      )
    })
    return (
      <div>
        <div> Friends: </div>
        <ul> {friends} </ul>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add Friend:
            <input type="text" value={this.state.addedFriend} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default FriendsList

import React, {Component} from 'react'

class FriendsList extends Component {
  constructor(props) {
    super(props)
    this.state = {friends: [], friendToAdd: ''}
    this.addFriend = this.addFriend.bind(this)
    this.removeFriend = this.removeFriend.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  addFriend(event) {
    fetch(`/api/v1/users/${this.getUserId()}`, {
      method: 'PATCH',
      body: JSON.stringify({friendToAdd: this.state.friendToAdd}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      this.setState({friends: body.friends})
    })
  }

  removeFriend(event) {
    fetch(`/api/v1/users/${this.getUserId()}`, {
      method: 'PATCH',
      body: JSON.stringify({friendToRemove: this.state.friends[event.target.id]}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      this.setState({friends: body.friends})
    })
  }

  handleChange(event) {
    this.setState({friendToAdd: event.target.value});
  }

  render() {
    let key = -1
    let friends = this.state.friends.map(friend => {
      key += 1
      return(
        <div key={key}>
          {friend[0]} ({friend[1]})
          <button id={key} onClick={this.removeFriend} className="removeFriendButton"> X </button>
        </div>
      )
    })
    return (
      <div>
        {friends}
        <form onSubmit={this.addFriend}>
          <label>
            <input type="text" value={this.state.friendToAdd} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Add Friend"/>
        </form>
        {this.state.alert}
      </div>
    )
  }
}

export default FriendsList

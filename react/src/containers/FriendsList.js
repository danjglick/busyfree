import React, {Component} from 'react'

class FriendsList extends Component {
  constructor(props) {
    super(props)
    this.state = {friends: [], selectedFriend: ''}
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
    this.setState({selectedFriend: event.target.value});
  }

  handleSubmit(event) {
    if(event.target.dataset.friend != null) {
      this.setState({selectedFriend: event.target.dataset.friend})
    }
    fetch(`/api/v1/users/${this.getUserId()}`, {
      method: 'PATCH',
      body: JSON.stringify({selectedFriend: this.state.selectedFriend}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(body => {
      this.setState({friends: body.friends})
    })
  }

  render() {
    let key = -1
    let friends = this.state.friends.map(friend => {
      key += 1
      return(
        <div key={key}> {friend} (phone number) </div>
      )
    })
    return (
      <div>
        <h1> Friends </h1>
        {friends}
        <form onSubmit={this.handleSubmit}>
          <label> <input type="text" value={this.state.selectedFriend} onChange={this.handleChange}/> </label>
          <input type="submit" value="Add/Remove Friend"/>
        </form>
      </div>
    )
  }
}

export default FriendsList

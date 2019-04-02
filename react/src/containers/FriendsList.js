import React, {Component} from 'react'

class FriendsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(localStorage.user),
      friends: [],
      friendToAdd: '',
      searchResults: []
    }
    this.addFriend = this.addFriend.bind(this)
    this.removeFriend = this.removeFriend.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/users/${this.state.user.id}`)
      .then(response => response.json())
      .then(body => {
        this.setState({friends: body.friends})
      })
    this.timerId = setInterval(
      () => this.tick(),
      1
    )
  }

  tick() {
    this.setState({user: JSON.parse(localStorage.user)})
  }

  addFriend(e) {
    fetch(`/api/v1/users/${this.state.user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        friendToAdd: this.state.searchResults[e.target.id]
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
          friends: body.friends,
          searchResults: []
        })
      })
  }

  removeFriend(e) {
    fetch(`/api/v1/users/${this.state.user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        friendToRemove: this.state.friends[e.target.id]
      }),
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

  handleChange(e) {
    e.persist()
    this.setState({friendToAdd: e.target.value})
    fetch(`/api/v1/users`)
    .then(response => response.json())
    .then(body => {
      let newSearchResults = []
      let areSearchResultsPresent = false
      if (e.target.value.length > 2) {
        for (let i=0; i<body.length; i++) {
          if (body[i].name.slice(0, e.target.value.length).toUpperCase() == e.target.value.toUpperCase()) {
            newSearchResults.push({name: body[i].name, id: body[i].id})
            areSearchResultsPresent = true
          }
        }
      }
      this.setState({searchResults: newSearchResults})
    })
  }

  render() {
    let key = -1
    let friends = this.state.friends.map(friend => {
      key += 1
      if (this.state.user.id != 1) {
        return(
          <span key={key}>
            {friend.name}
            <button
              id={key}
              onClick={this.removeFriend}
              className="removeFriendButton"
              > X
            </button>
            <br />
          </span>
        )
      }
    })
    key = -1
    let searchResults = this.state.searchResults.map(searchResult => {
      key += 1
      return(
        <div key={key}>
          <button
            id={key}
            className='searchResult'
            onClick={this.addFriend}
            > {searchResult.name}
          </button>
        </div>
      )
    })
    if (this.props.clickedHeading != "Friends") {
      return null
    }
    return (
      <div className="settingsContent">
        <p> {friends} </p>
        <form onSubmit={this.addFriend}>
          <label>
            <input
              type="text"
              placeholder="search for your friends!"
              value={this.state.friendToAdd}
              onChange={this.handleChange}
            />
          </label>
        </form>
        {searchResults}
      </div>
    )
  }
}

export default FriendsList

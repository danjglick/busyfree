import React, {Component} from 'react'
import Friend from '../components/friend'
import SearchResult from '../components/searchresult'

class FriendsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signInMsg: '',
      user: {},
      friends: [],
      friendToAdd: '',
      searchResults: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.addFriend = this.addFriend.bind(this)
    this.removeFriend = this.removeFriend.bind(this)
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    )
  }

  tick() {
    if (this.state.user != JSON.parse(localStorage.user)) {
      fetch(`/api/v1/users/${JSON.parse(localStorage.user).id}`)
      .then(response => response.json())
      .then(body => {
        this.setState({friends: body.friends})
        if (JSON.parse(localStorage.user).id != 1) {
          this.setState({signInMsg: ''})
        }
      })
    }
    this.setState({user: JSON.parse(localStorage.user)})
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

  addFriend(e) {
    let friend = this.state.searchResults[e.target.id]
    fetch(`/api/v1/users/${JSON.parse(localStorage.user).id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        friendToAdd: friend
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
    if (JSON.parse(localStorage.user).id == 1) {
      let capitalizedFriendName = friend.name.charAt(0).toUpperCase() + friend.name.slice(1)
      this.setState({signInMsg: `sign-in to see if ${capitalizedFriendName} is free!`})
    }
  }

  removeFriend(e) {
    fetch(`/api/v1/users/${JSON.parse(localStorage.user).id}`, {
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

  render() {
    let key = -1
    let friends = this.state.friends.map(friend => {
      key += 1
      if (JSON.parse(localStorage.user).id != 1) {
        return(
          <Friend
            key={key}
            id={key}
            removeFriend={this.removeFriend}
            friendName={friend.name}
          />
        )
      }
    })
    key = -1
    let searchResults = this.state.searchResults.map(searchResult => {
      key += 1
      return(
        <SearchResult
          key={key}
          id={key}
          addFriend={this.addFriend}
          searchResultName={searchResult.name}
        />
      )
    })
    if (this.props.clickedHeading != "Friends") {
      return null
    }
    return (
      <div className="settingsContent">
        <p> {this.state.signInMsg} </p>
        <p> {friends} </p>
        <form onSubmit={this.addFriend}>
          <input
            type="text"
            placeholder="search for your friends!"
            value={this.state.friendToAdd}
            onChange={this.handleChange}
          />
        </form>
        {searchResults}
      </div>
    )
  }
}

export default FriendsList

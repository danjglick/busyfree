import React from 'react'

const SearchResult = props => {
  return(
    <div key={props.id}>
      <button
        className='searchResult'
        id={props.id}
        onClick={props.addFriend}
        >
        {props.searchResultName}
      </button>
    </div>
  )
}

export default SearchResult

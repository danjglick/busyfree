import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/home'
import Settings from './containers/settings'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home/>,
    document.getElementById('home')
  )
})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Settings/>,
    document.getElementById('settings')
  )
})

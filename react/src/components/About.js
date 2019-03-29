import React from 'react'

const About = props => {
  if (props.clickedHeading != "About") {
    return null
  }
  return(
    <div className="settingsContent">
      <p>
        <span id="notification">BusyFree </span>
        is a simpler way
        to connect with others.
      </p>
      <p>
        Just add your friends, then tap the big
        yellow button whenever you&apos;re free.
      </p>
      <p>
        We&apos;ll notify you whenever you and
        your friends are free at the same time.
      </p>
      <p>
        &copy;2019
        <div> Dan Glick (danjglick@gmail.com) </div>
      </p>
    </div>
  )
}

export default About

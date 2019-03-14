import React from 'react'

const About = props => {
  if (props.clickedHeading != "About") {
    return null
  }
  return(
    <div className="settingsContent">
      <p> BusyFree is a simpler way to connect with friends. </p>
      <p> Add friends to your list (which only you can see). Then click the big gold button whenever you&apos;re free (which only you can see). We&apos;ll notify you whenever you and your friends are free at the same time. </p>
      <p> Copyright 2019. Dan Glick (danjglick@gmail.com). All rights reserved. </p>
    </div>
  )
}

export default About
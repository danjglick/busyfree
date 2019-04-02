import React from 'react'
import SignUpForm from '../containers/signupform'
import SignInForm from '../containers/signinform'

const GuestAccountSettings = props => {
  return(
    <div className='settingsContent'>
      <br />
      <div className='settingsHeading'> sign-up </div>
      <br />
      <SignUpForm />
      <br />
      <div className='settingsHeading'> sign-in </div>
      <br />
      <SignInForm />
    </div>
  )
}

export default GuestAccountSettings

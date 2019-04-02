import React from 'react'
import SignUpForm from '../containers/signupform'
import SignInForm from '../containers/signinform'

const GuestAccountSettings = props => {
  return(
    <div className='settingsContent'>
      <br />
      <div> sign-up </div>
      <SignUpForm />
      <br />
      <div> sign-in </div>
      <SignInForm />
    </div>
  )
}

export default GuestAccountSettings

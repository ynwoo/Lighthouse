import React from 'react'
import SignIn from '../components/User/SignIn'

function SignInPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-47px',
      }}
    >
      {' '}
      <SignIn />
    </div>
  )
}

export default SignInPage

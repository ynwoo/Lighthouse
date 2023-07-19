import React from 'react'
import SignInSide from '../User/SignInSide'

export default function SideComponent() {
  return (
    <div
      className="comp"
      style={{
        width: '300px',
        height: '800px',
      }}
    >
      <h3>SideComponent</h3>
      <SignInSide />
    </div>
  )
}

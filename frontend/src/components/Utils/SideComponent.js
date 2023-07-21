import React from 'react'
import UserProfile from '../User/UserProfileSide'

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
      <UserProfile />
    </div>
  )
}

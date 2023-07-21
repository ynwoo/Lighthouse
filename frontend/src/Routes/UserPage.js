import React from 'react'
import UserProfile from '../components/User/UserProfile'

export default function UserPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-4px',
      }}
    >
      <UserProfile />
    </div>
  )
}

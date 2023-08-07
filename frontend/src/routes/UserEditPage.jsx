import React from 'react'
import UserEdit from '../components/User/UserEdit'

export default function UserPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-49px',
      }}
    >
      <UserEdit />
    </div>
  )
}

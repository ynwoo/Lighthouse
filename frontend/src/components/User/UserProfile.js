import React from 'react'
import profilePic from '../../logo.svg'
import UserFollow from './UserFollow'

export default function UserProfile() {
  return (
    <div
      className="comp"
      style={{
        width: '300px',
        height: '800px',
      }}
    >
      <h3>UserProfile</h3>
      <div
        className="flex"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={profilePic}></img>
        <h4>Name</h4>
        <UserFollow />
      </div>
    </div>
  )
}

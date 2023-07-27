import React, { useState } from 'react'

// 유저의 팔로우 컴포넌트

export default function UserFollow() {
  const [btnState, setBtn] = useState('following')

  const showFollowing = () => {
    setBtn('following')
  }
  const showFollower = () => {
    setBtn('follower')
  }

  return (
    <div className="comp">
      <h3>UserFollow</h3>
      <span className="comp" onClick={showFollowing}>
        following
      </span>
      <span className="comp" onClick={showFollower}>
        follower
      </span>
      <h3>{btnState}</h3>
    </div>
  )
}

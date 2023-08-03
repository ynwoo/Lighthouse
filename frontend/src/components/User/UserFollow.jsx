import React from 'react'

// 유저의 팔로우 컴포넌트

export default function UserFollow() {
  return (
    <div className="comp">
      <h3>UserFollow</h3>
      <details>
        <summary>Followings</summary>
        <ul>
          <li>신기정</li>
        </ul>
      </details>
      <details>
        <summary>Followers</summary>
        <ul>
          <li>신기정</li>
          <li>신기정</li>
        </ul>
      </details>
    </div>
  )
}

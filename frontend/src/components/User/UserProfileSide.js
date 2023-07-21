import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../../logo.svg'
import UserFollow from './UserFollow'

// 옆에서 작게 보는 프로필

export default function UserProfileSide() {
  const [message, setName] = useState('로그인, 필요.')
  const [btnState, setBtn] = useState('SignIn')
  const Pic = profilePic

  function SignInAction() {
    setName(
      message === '로그인, 필요.' ? '환영합니다, 리액트님!' : '로그인, 필요.',
    )
    setBtn(btnState === 'SignIn' ? 'LogOut' : 'SignIn')
  }

  if (btnState === 'SignIn') {
    return (
      <div
        className="comp"
        style={{
          margin: '5px',
        }}
      >
        <h4>SignInSide</h4>
        {message}
        <div>
          <button type="submit" onClick={SignInAction}>
            {btnState}
          </button>
        </div>
      </div>
    )
  }
  return (
    <div
      className="comp"
      style={{
        width: '300px',
        height: '800px',
      }}
    >
      <h3>UserProfileSide</h3>
      <div
        className="flex"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={Pic} alt="없다" />

        <Link to="/user/fromUserProfileSide">
          <h4>{message}</h4>
        </Link>

        <button type="submit" onClick={SignInAction}>
          {btnState}
        </button>
        <UserFollow />
      </div>
    </div>
  )
}

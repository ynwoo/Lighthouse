import React, { useState } from 'react'

export default function SignInSide() {
  const [message, setName] = useState('로그인, 필요.')
  const [btnState, setBtn] = useState('SignIn')

  function SignInAction() {
    setName(message === '로그인, 필요.' ? '환영합니다!' : '로그인, 필요.')
    setBtn(btnState === 'SignIn' ? 'LogOut' : 'SignIn')
  }

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
        <button onClick={SignInAction}>{btnState}</button>
        <button>SignUp</button>
      </div>
    </div>
  )
}

import React from 'react'

export default function SignInSide() {
  let message = '로그인, 필요'

  function SignIn() {
    message = '환영합니다!'
    console.log(message)
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
        <button onClick={SignIn}>SignIn</button>
        <button>SignUp</button>
      </div>
    </div>
  )
}

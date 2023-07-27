import React from 'react'
import readerLogo from '../../static/crown.png'
// 템플릿 상세의 인원정보(멤버)

export default function TempMember() {
  return (
    <div className="comp">
      {/* 만약 팀장이면 띄우기 */}
      <div className="t_mem_text">
        <img
          src={readerLogo}
          alt="엑박"
          style={{
            width: '40px',
            height: '40px',
            marginTop: '10px',
            marginRight: '5px',
          }}
        />
        <h2>닉네임</h2>
      </div>
    </div>
  )
}

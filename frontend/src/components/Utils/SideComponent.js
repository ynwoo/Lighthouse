import React from 'react'
import { Button } from 'antd'
// import Column from 'antd/es/table/Column'
import UserProfile from '../User/UserProfileSide'

export default function SideComponent() {
  return (
    <div
      // className="comp"
      style={{
        width: '20%',
        height: '800px',
      }}
    >
      <h3>SideComponent</h3>
      <UserProfile />
      <div
        style={{
          display: 'flex',
          flexDirection: 'Column',
        }}
      >
        <div
          style={{
            marginTop: '10px',

          }}>
          <Button type="primary" style={{ width: '150px' }}>LOGIN</Button>
        </div>
        <div
          style={{
            marginTop: '10px',
          }}>
          <Button type="primary" style={{ width: '150px' }} danger>
            SIGNUP
          </Button>
        </div>
      </div>
    </div>
  )
}

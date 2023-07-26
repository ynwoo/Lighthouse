import React from 'react'
import { Button, Layout } from 'antd'
import { Link } from 'react-router-dom';

const { Sider } = Layout;

// 사이드
const siderStyle = {
  textAlign: 'center',
  lineHeight: '100%',
  color: 'black',
  backgroundColor: 'transparent',
  margin: '10px',
  // position: 'fixed'
};


export default function SideComponent() {
  return (
    <Sider style={siderStyle}>
      <div style={{
        display: 'flex', flexDirection: 'Column',
        alignItems: 'center',
        padding: '10px', borderRadius: '10px',
        backgroundColor: 'white',
      }}>
        <Link to="/login">
          <Button type="primary" style={{ width: '150px', margin: '10px' }}>
            LOGIN
          </Button>
        </Link>
        <Link to="/signup">
          <Button type="primary" style={{ width: '150px', margin: '10px' }} danger>
            SIGNUP
          </Button>
        </Link>

        <div style={{
          border: '1px solid',
          borderRadius: '10px', width: '80%',
          margin: '10px'
        }}>
          <h4>베스트 스터디</h4>
          <p>1. </p>
          <p>2. </p>
          <p>3. </p>
        </div>
        <div style={{
          border: '1px solid',
          borderRadius: '10px', width: '80%',
          margin: '10px'
        }}>
          <h4>베스트 템플릿</h4>
          <p>1. </p>
          <p>2. </p>
          <p>3. </p>
        </div>
      </div>
    </Sider>
  )
}

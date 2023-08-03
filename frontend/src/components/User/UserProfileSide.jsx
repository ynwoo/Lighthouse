import { Layout } from 'antd'
import profilePic from '../../logo.svg'

const { Sider } = Layout
const siderStyle = {
  textAlign: 'center',
  lineHeight: '100%',
  color: 'black',
  backgroundColor: 'transparent',
  // margin: '10px',
  position: 'fixed',
}

export default function UserProfileSide() {
  const Pic = profilePic

  return (
    <Sider style={siderStyle}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'Column',
          alignItems: 'center',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      >
        <img src={Pic} alt="XBOX" />

        <div
          style={{
            border: '1px solid',
            borderRadius: '10px',
            width: '80%',
            margin: '10px',
          }}
        >
          <h4>베스트 스터디</h4>
          <p>1. </p>
          <p>2. </p>
          <p>3. </p>
        </div>
        <div
          style={{
            border: '1px solid',
            borderRadius: '10px',
            width: '80%',
            margin: '10px',
          }}
        >
          <h4>베스트 템플릿</h4>
          <p>1. </p>
          <p>2. </p>
          <p>3. </p>
        </div>
      </div>
    </Sider>
  )
}

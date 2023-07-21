import React from 'react'
// import SideComponent from '../components/Utils/SideComponent'
// import MainComponent from '../components/Utils/MainComponent'
import { Button, Col, Row } from 'antd'



export default function MainPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-4px',
      }}
    >

      <div
        style={{
          display: 'flex',
          flexDirection: 'Column',
        }}
      >

        <Row>
          <Col span={21} push={20}>
            큰칸
          </Col>
          <Col span={3} pull={20}>
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
          </Col>
        </Row>
      </div>



      {/* <SideComponent />
      <MainComponent /> */}
    </div>
  )
}

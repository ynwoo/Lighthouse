// import React, { useState } from 'react'
import { Layout, Menu, Card, Space, Avatar, Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

const { Content, Sider } = Layout
// 템플릿 상세의 질의응답

const items2 = [
  '정보',
  '진행 중인 스터디',
  '스터디 참여 기록',
  '템플릿 북마크',
].map((text, index) => {
  const key = String(index + 1)
  return {
    key: `sub${key}`,
    label: text,
  }
})

export default function UserEdit() {
  // const [checkboxValues, setCheckboxValues] = useState({
  //   개발: false,
  //   알고리즘: false,
  //   CS: false,
  //   면접: false,
  //   공무원: false,
  //   인적성: false,
  //   수능: false,
  //   영어: false,
  //   // 필요한 만큼 체크박스 상태 변수를 추가할 수 있습니다.
  // })

  // const handleCheckboxChange = event => {
  //   const { name, checked } = event.target
  //   setCheckboxValues({
  //     ...checkboxValues,
  //     [name]: checked,
  //   })
  // }

  return (
    <Layout
      style={{
        padding: '3vh 10vw',
        background: 'rgb(255, 255, 255)',
      }}
    >
      <Sider
        style={{
          background: 'rgb(255, 255, 255)',
        }}
        width={200}
      >
        <Card bordered={false}>
          <Avatar
            size={{ sm: 100, md: 150, lg: 150 }}
            src="/profile.jpg"
            shape="circle"
          />
          <h2 style={{ marginBottom: '0px' }}>닉네임</h2>
          <p>이름</p>
          <Button block style={{ margin: '2vh 0' }}>
            팔로우
          </Button>
          <Row>
            <Col span={12} align="middle">
              <Link to="/">30 팔로워</Link>
            </Col>
            <Col span={12} align="middle">
              <Link to="/">22 팔로잉</Link>
            </Col>
          </Row>
        </Card>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
          }}
          items={items2}
        />
      </Sider>
      <Content
        style={{
          padding: '0 24px',
          minHeight: 280,
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card title="자기소개" bordered={false}>
            <p>
              안녕하세요. 멋진 스터디를 찾고 있는 커비입니다. 잘 부탁드립니다.
            </p>
          </Card>
          <Card title="Card" bordered={false}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </Content>
    </Layout>
  )
}

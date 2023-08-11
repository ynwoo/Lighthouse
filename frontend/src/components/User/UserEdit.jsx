import React from 'react'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout, Card, Avatar, Button, Row, Col, Tabs } from 'antd'
import { useSelector } from 'react-redux'
// import { userAction } from '../../store/user'
import StudyList from '../Study/StudyList'
import UserInfo from './UserInfo'
import UserInfoModify from './UserInfoModify'
// import React, { useState } from 'react'
// import { userAction } from '../../store/user'

const { Content, Sider } = Layout

export default function UserEdit() {
  // const dispatch = useDispatch()
  // const location = useLocation()
  const profile = useSelector(state => state.user.profile)
  console.log(profile)
  // useEffect(() => {
  //   const { userId } = location.state
  //   dispatch(userAction.profile(userId))
  //   dispatch(userAction.getFollowing())
  // }, [location.state.userId])
  // console.log('프', profile)

  // const { userId } = location.state
  // console.log(userId)

  const items = [
    {
      key: '1',
      label: `정보`,
      children: <UserInfo />,
    },
    {
      key: '2',
      label: `tab 2`,
      children: <StudyList />,
    },
    {
      key: '3',
      label: `프로필 수정`,
      children: <UserInfoModify />,
    },
  ]

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
            size={{ sm: 100, md: 150, lg: 150, xl: 150, xxl: 150 }}
            src="/profile.jpg"
            shape="circle"
          />
          <h2 style={{ marginBottom: '0px' }}>
            닉네임
            {profile.id}
          </h2>
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
      </Sider>
      <Content
        style={{
          padding: '0 24px',
          minHeight: 280,
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Content>
    </Layout>
  )
}

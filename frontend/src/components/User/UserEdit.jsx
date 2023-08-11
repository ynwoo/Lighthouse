import React from 'react'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout, Card, Avatar, Button, Row, Col, Tabs } from 'antd'
// import { userAction } from '../../store/user'

import StudyList from '../Study/StudyList'
import UserInfo from './UserInfo'
import UserInfoModify from './UserInfoModify'
// import React, { useState } from 'react'

const { Content, Sider } = Layout
// 템플릿 상세의 질의응답

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
  // const handleMenuClick = ({ key }) => {
  //   const { target } = menuItems.find(item => item.key === key) || {}
  //   if (target) {
  //     navigate(target)
  //   }
  // }
  // const dispatch = useDispatch()
  // const location = useLocation()
  // useEffect(() => {
  //   const { userId } = location.state
  //   // console.log('asdfasdfasdfasdf', userId)
  //   dispatch(userAction.profile(userId))
  // }, [])
  // const profile = useSelector(state => state.user.profile)

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
        {/* <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{
            height: '100%',
          }}
          items={menuItems}
          // onClick={handleMenuClick}
        /> */}
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

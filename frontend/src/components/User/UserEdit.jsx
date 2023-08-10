import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Layout, Menu, Card, Space, Avatar, Button, Row, Col } from 'antd'
import { userAction } from '../../store/user'
// import React, { useState } from 'react'

const { Content, Sider } = Layout
// 템플릿 상세의 질의응답

const menuItems = [
  { label: <Link to={`/user_edit/${userId}`}>정보</Link>, key: '1' },
  { label: <Link to="inprogress">진행 중인 스터디</Link>, key: '2' },
  { label: '스터디 참여 기록', key: '3' },
  { label: '템플릿 북마크', key: '4' },
]
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
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    const { userId } = location.state
    // console.log('asdfasdfasdfasdf', userId)
    dispatch(userAction.profile(userId))
  }, [])
  const profile = useSelector(state => state.user.profile)

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
          style={{
            height: '100%',
          }}
          items={menuItems}
          // onClick={handleMenuClick}
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

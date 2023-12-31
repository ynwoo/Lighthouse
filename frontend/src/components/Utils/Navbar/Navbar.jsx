import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Row, Col, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { userAction } from '../../../store/user'

export default function Navbar({ isLoggedIn }) {
  const dispatch = useDispatch()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(userAction.logout()).then(() => {
      window.location.href = '/'
    })
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Row justify="space-between" align="middle">
        <Col xl={6} lg={6} md={6} sm={20} xs={20}>
          <Link to="/" state={{ status: 1 }}>
            <div style={{ paddingLeft: '10px', marginRight: '-10px' }}>
              <img
                src={`${process.env.REACT_APP_CLOUDFRONT_DOMAIN_URL}badge/main_logo_1692330123477.PNG`}
                alt="엑박"
                style={{ height: '50px' }}
              />
            </div>
          </Link>
        </Col>
        <Col
          xl={18}
          lg={18}
          md={18}
          sm={4}
          xs={4}
          align="center"
          style={{ height: '50px' }}
        >
          <Menu
            backgroundColor="white"
            mode="horizontal"
            defaultSelectedKeys={['/']}
            overflowedIndicator={<MenuOutlined />}
            style={{ display: 'block', height: '100%' }}
            selectedKeys={[location.pathname]}
          >
            {!isLoggedIn && (
              <>
                <Menu.Item key="/login" style={{ float: 'right' }}>
                  <Link to="/login">로그인</Link>
                </Menu.Item>
                <Menu.Item key="/signup" style={{ float: 'right' }}>
                  <Link to="/signup">회원가입</Link>
                </Menu.Item>
              </>
            )}
            {isLoggedIn && (
              <>
                <Menu.Item
                  key="item3"
                  onClick={handleLogout}
                  style={{ float: 'right' }}
                >
                  로그아웃
                </Menu.Item>
                <Menu.Item key="/user/me" style={{ float: 'right' }}>
                  <Link
                    to={`/user_edit/${sessionStorage.getItem('userId')}`}
                    state={{ userId: Number(sessionStorage.getItem('userId')) }}
                  >
                    마이페이지
                  </Link>
                </Menu.Item>
                <Menu.Item key="/mystudies" style={{ float: 'right' }}>
                  <Link
                    to="/mystudies"
                    state={{ userId: Number(sessionStorage.getItem('userId')) }}
                  >
                    내 스터디
                  </Link>
                </Menu.Item>
              </>
            )}
            <Menu.Item key="/templates" style={{ float: 'right' }}>
              <Link to="/templates" state={{ status: 5 }}>
                템플릿 둘러보기
              </Link>
            </Menu.Item>
            <Menu.Item key="/" style={{ float: 'right' }}>
              <Link to="/" state={{ status: 5 }}>
                스터디 모집
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

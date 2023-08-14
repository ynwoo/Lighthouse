import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Row, Col, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import logo from '../../../static/main_logo.PNG'
import { userAction } from '../../../store/user'

export default function Navbar({ isLoggedIn }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.pathname)
  const handleLogout = e => {
    e.preventDefault()
    dispatch(userAction.logout()).then(() => navigate('/'))
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Row>
        <Col xl={6} lg={6} md={6} sm={20} xs={20}>
          <Link
            to="/"
            state={{ status: 1 }}
            style={{ zIndex: 2, position: 'relative' }}
          >
            <div
              style={{ paddingLeft: '10px', display: 'flex', zIndex: '999' }}
            >
              <img src={logo} alt="엑박" style={{ height: '50px' }} />
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
            <Menu.Item key="/" style={{ float: 'left' }}>
              <Link to="/" state={{ status: 5 }}>
                스터디 모집
              </Link>
            </Menu.Item>
            <Menu.Item key="/temp" style={{ float: 'left' }}>
              <Link to="/temp" state={{ status: 5 }}>
                템플릿 둘러보기
              </Link>
            </Menu.Item>
            {isLoggedIn ? (
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
                    to="/user/me"
                    state={{ userId: Number(sessionStorage.getItem('userId')) }}
                    className="dropdown_toggle"
                  >
                    마이페이지
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="/signup" style={{ float: 'right' }}>
                  <Link to="/signup">회원가입</Link>
                </Menu.Item>
                <Menu.Item key="/login" style={{ float: 'right' }}>
                  <Link to="/login">로그인</Link>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

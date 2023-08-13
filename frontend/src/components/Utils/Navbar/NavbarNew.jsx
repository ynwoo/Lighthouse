import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Row, Col, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import logo from '../../../static/main_logo.PNG'
import { userAction } from '../../../store/user'

export default function Navbar({ isLoggedIn }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = e => {
    e.preventDefault()
    dispatch(userAction.logout()).then(navigate('/'))
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
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
        <Col xl={18} lg={18} md={18} sm={4} xs={4}>
          <Menu
            theme="Light"
            mode="horizontal"
            defaultSelectedKeys={['item1']}
            overflowedIndicator={<MenuOutlined />}
            style={{ display: 'block' }}
          >
            <Menu.Item key="item1">
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
                <Menu.Item style={{ float: 'right' }}>
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
                <Menu.Item key="item5" style={{ float: 'right' }}>
                  <Link to="/signup">회원가입</Link>
                </Menu.Item>
                <Menu.Item key="item4" style={{ float: 'right' }}>
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

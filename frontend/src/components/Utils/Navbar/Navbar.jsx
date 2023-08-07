import React from 'react'
// import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logo from '../../../static/main_logo.PNG'
import { userAction } from '../../../store/user'

export default function App() {
  const dispatch = useDispatch
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/" style={{ zIndex: 2, position: 'relative' }}>
        <div style={{ paddingLeft: '10px', display: 'flex', zIndex: '999' }}>
          <img src={logo} alt="엑박" style={{ height: '50px' }} />
        </div>
      </Link>
      <div style={{ display: 'flex', flexDirection: 'end-flex', zIndex: '1' }}>
        <div className="container nav_main">
          <div className="item nav_item">
            <Link to="/">템플릿 더보기</Link>
          </div>

          <div className="item nav_item">
            <Link to="/signup">JOIN</Link>
          </div>

          <div className="item dropdown_king nav_item">
            <Link to="/login" className="dropdown_toggle">
              LOGIN
            </Link>
          </div>
          <div className="item dropdown_king nav_item">
            <Link to="/user/me" className="dropdown_toggle">
              MYPAGE
            </Link>
          </div>
          <button onClick={dispatch(userAction.logout())} type="button">
            응애
          </button>
        </div>
      </div>
    </div>
  )
}

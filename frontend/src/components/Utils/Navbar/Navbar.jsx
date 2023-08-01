import React from 'react'
// import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../../static/main_logo.PNG'

export default function App() {
  // const nowIn = items.find(obj => {
  //   return obj.linkTo === window.location.pathname
  // })

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: '1',
      }}
    >
      <div
        className="container nav_main"
        style={{ justifyContent: 'space-between' }}
      >
        <Link to="/">
          <div style={{ margin: '10px' }}>
            <img src={logo} alt="엑박" style={{ height: '50px' }} />
          </div>
        </Link>
        <div style={{ display: 'flex' }}>
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
        </div>
      </div>
    </div>
  )
}

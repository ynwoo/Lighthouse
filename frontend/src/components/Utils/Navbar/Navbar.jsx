import React from 'react'
// import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../../static/main_logo.PNG'

export default function App() {

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/">
        <div style={{ paddingLeft: '10px', display: 'flex' }}>
          <img src={logo} alt="엑박" style={{ height: '50px' }} />
        </div>
      </Link>

      <div className="container nav_main">
        <div className="item nav_item">
          <Link to="/myprofile/main">템플릿 더보기</Link>
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

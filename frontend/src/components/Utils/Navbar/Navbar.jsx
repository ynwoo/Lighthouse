import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link
        to="/"
        state={{ status: 1 }}
        style={{ zIndex: 2, position: 'relative' }}
      >
        <div style={{ paddingLeft: '10px', display: 'flex', zIndex: '999' }}>
          <img src={logo} alt="엑박" style={{ height: '50px' }} />
        </div>
      </Link>
      <div style={{ display: 'flex', flexDirection: 'end-flex', zIndex: '1' }}>
        <div className="container nav_main">
          <div className="item nav_item">
            <Link to="/temp" state={{ status: 5 }}>
              템플릿 더보기
            </Link>
          </div>
          {!isLoggedIn ? (
            <>
              <div className="item nav_item">
                <Link to="/signup">JOIN</Link>
              </div>
              <div className="item dropdown_king nav_item">
                <Link to="/login" className="dropdown_toggle">
                  LOGIN
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="item dropdown_king nav_item">
                <Link
                  to={`/user_edit/${Number(sessionStorage.getItem('userId'))}`}
                  className="dropdown_toggle"
                >
                  MYPAGE
                </Link>
              </div>
              <div className="item dropdown_king nav_item">
                <Link
                  to={false}
                  onClick={handleLogout}
                  className="dropdown_toggle"
                >
                  LOGOUT
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

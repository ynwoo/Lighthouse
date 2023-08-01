import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div className="container nav_main">
      {/* 오른쪽 글자 정렬 */}
      <div className="item nav_item">
        {/* 1번 링크 */}
        <Link to="/myprofile/main">템플릿 더보기</Link>
      </div>

      <div className="item nav_item">
        {/* 2번 링크 */}
        <Link to="/signup">JOIN</Link>
      </div>

      <div className="item dropdown_king nav_item">
        {/* 3번 링크 */}
        <Link to="/login" className="dropdown_toggle">
          LOGIN
        </Link>
      </div>
    </div>
  )
}

export default Nav

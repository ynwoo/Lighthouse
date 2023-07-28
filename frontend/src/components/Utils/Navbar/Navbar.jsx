import React from 'react'
import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../../static/main_logo.PNG'

const items = [
  {
    key: '1',
    label: `템플릿 더보기`,
    linkTo: '/',
  },
  {
    key: '2',
    label: `JOIN`,
    linkTo: '/signup',
  },
  {
    key: '3',
    label: `LOGIN`,
    linkTo: '/login',
  },
]
export default function App() {
  const nowIn = items.find(obj => {
    return obj.linkTo === window.location.pathname
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/">
        <div style={{ paddingLeft: '10px', display: 'flex' }}>
          <img src={logo} alt="엑박" style={{ height: '50px' }} />
        </div>
      </Link>

      {/* 새로고침 시 tab default 문제 */}

      <div>
        <Tabs defaultActiveKey={nowIn.key} style={{ paddingRight: '10px' }}>
          {items.map(item => (
            <Tabs.TabPane
              tab={<Link to={item.linkTo}>{item.label}</Link>}
              key={item.key}
            />
          ))}
        </Tabs>
      </div>
    </div>
  )
}

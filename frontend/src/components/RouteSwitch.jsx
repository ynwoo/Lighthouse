import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'

function RouteSwitch({ children }) {
  return (
    <Routes>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          const { path, element } = child.props // 필요한 프롭스 추출
          return <Route path={path} element={element} />
        }
        return null
      })}
    </Routes>
  )
}

RouteSwitch.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RouteSwitch

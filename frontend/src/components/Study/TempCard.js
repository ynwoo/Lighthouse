import React from 'react'
import { Link } from 'react-router-dom'

export default function TempCard() {
  return (
    <Link to="/temp">
      <div
        className="comp"
        style={{
          width: '200px',
          height: '150px',
        }}
      >
        TempCard
      </div>
    </Link>
  )
}

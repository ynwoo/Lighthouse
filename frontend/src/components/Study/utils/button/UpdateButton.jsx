import React from 'react'
import './Button.css'

export default function UpdateButton({ onClick, children }) {
  return (
    <button className="button-create" type="button" onClick={onClick}>
      {children ?? '수정'}
    </button>
  )
}

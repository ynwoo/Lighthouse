import React from 'react'
import './Button.css'

export default function CreateButton({ onClick, children }) {
  return (
    <button className="button-create" type="button" onClick={onClick}>
      {children ?? '등록'}
    </button>
  )
}

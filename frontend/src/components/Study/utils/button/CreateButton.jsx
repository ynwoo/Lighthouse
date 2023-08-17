import React from 'react'
import styles from './Button.module.css'

export default function CreateButton({ onClick, color, children }) {
  return (
    <button
      className={[styles['button-create'], styles[`${color}`]].join(' ')}
      type="button"
      onClick={onClick}
    >
      {children ?? '등록'}
    </button>
  )
}

import React from 'react'
import styles from './Button.module.css'

export default function PageButton({ onClick, children, currentPage }) {
  return (
    <button
      style={{ backgroundColor: 'rgb(78, 149, 200)' }}
      className={[styles.button, styles[currentPage]].join(' ')}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

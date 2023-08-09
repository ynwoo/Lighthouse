import React from 'react'
import styles from './Button.module.css'

export default function UpdateButton({ onClick, children }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children ?? '수정'}
    </button>
  )
}

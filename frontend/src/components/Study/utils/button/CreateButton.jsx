import React from 'react'
import styles from './Button.module.css'

export default function CreateButton({ onClick, children }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children ?? '등록'}
    </button>
  )
}

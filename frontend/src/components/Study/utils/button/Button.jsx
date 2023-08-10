/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styles from './Button.module.css'

export default function NextButton({ onClick, children }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

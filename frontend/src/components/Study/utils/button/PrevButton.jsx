import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './Button.module.css'

export default function PrevButton({ onClick, disabled, children }) {
  return (
    <button
      disabled={disabled}
      className={[styles.button, styles[disabled]].join(' ')}
      type="button"
      onClick={onClick}
    >
      {children}
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  )
}

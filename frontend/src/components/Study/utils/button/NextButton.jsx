import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import styles from './Button.module.css'

export default function NextButton({ onClick, disabled, children }) {
  return (
    <button
      disabled={disabled}
      className={[styles.button, styles[disabled], styles['button-right']].join(
        ' ',
      )}
      type="button"
      onClick={onClick}
    >
      {children}
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  )
}

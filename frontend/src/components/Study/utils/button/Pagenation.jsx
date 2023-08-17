import React from 'react'
import PrevButton from './PrevButton'
import NextButton from './NextButton'
import PageButton from './PageButton'
import styles from './Button.module.css'

export default function Pagenation({ handleMovePage, totalPage, currentPage }) {
  const start = Math.floor(currentPage / 10) * 10
  const end = Math.min(start + 10, totalPage)
  const pages = []
  // eslint-disable-next-line no-plusplus
  for (let index = start; index < end; index++) {
    pages.push(
      <PageButton
        currentPage={index === currentPage && 'currentPage'}
        onClick={handleMovePage(index)}
      >
        {index + 1}
      </PageButton>,
    )
  }

  return (
    <div className={styles.pagenation}>
      <PrevButton
        disabled={currentPage === 0 && 'disabled'}
        onClick={handleMovePage(currentPage - 1)}
      />
      {pages}
      <NextButton
        disabled={currentPage === totalPage - 1 && 'disabled'}
        onClick={handleMovePage(currentPage + 1)}
      />
    </div>
  )
}

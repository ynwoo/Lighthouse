import React, { useState } from 'react'
import { List } from 'antd'
import StudyCard from './StudyCard'
import { PAGE } from '../../utils'
import Pagenation from './utils/button/Pagenation'

function StudyList({ studies, handleMovePage, totalPage, currentPage }) {
  const [page, setPage] = useState(0)
  const start = page * PAGE
  const end = (page + 1) * PAGE

  return (
    <div style={{ width: '100%' }}>
      <List
        grid={{
          colAlign: 'middle',
          gutter: 12,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={
          handleMovePage
            ? studies
            : studies.filter((study, index) => index >= start && index < end)
        }
        renderItem={study => (
          <List.Item>
            <StudyCard study={study} />
          </List.Item>
        )}
      />
      <Pagenation
        handleMovePage={
          handleMovePage ||
          (newPage => () => {
            setPage(newPage)
          })
        }
        totalPage={totalPage || Math.ceil(studies.length / 8)}
        currentPage={currentPage || page}
      />
    </div>
  )
}

export default StudyList

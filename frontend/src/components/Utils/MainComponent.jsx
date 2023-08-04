import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TempCard from '../Study/TempCard'
import { studyAction } from '../../store/study'

function MainComponent() {
  const dispatch = useDispatch()
  const params = useSelector(state => state.study.params)
  const studies = useSelector(state => state.study.studies)

  useEffect(() => {
    console.log(params)
    dispatch(studyAction.studyList(params))
  }, [])

  console.log(sessionStorage.getItem('isLoggedIn'))
  console.log(studies)
  return (
    <div
      style={{
        border: '1px solid',
        display: 'flex',
        margin: '10px',
        marginLeft: '250px',
      }}
    >
      <div
        style={{
          margin: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* 렌더링 이전에 배열 메서드(filter)를 통해 필터링을 하고 보여준다. */}
        {studies.map(study => (
          <TempCard study={study} key={study.id} />
        ))}
      </div>
    </div>
  )
}

export default MainComponent

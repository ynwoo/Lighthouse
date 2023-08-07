import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
<<<<<<< HEAD
import StudyCard from '../Study/StudyCard'
=======
import TempCard from '../Study/TempCard'
>>>>>>> ff5fbb36691753512f8dfe94227406e2fcc14cfd
import { studyAction } from '../../store/study'

function MainComponent() {
  const dispatch = useDispatch()
  const params = useSelector(state => state.study.params)
  const studies = useSelector(state => state.study.studies)

  useEffect(() => {
    console.log(params)
    dispatch(studyAction.studyList(params))
    dispatch(studyAction.getTags())
  }, [])

  console.log(sessionStorage.getItem('isLoggedIn'))
  console.log(studies)

  return (
    <div>
      <div style={{ width: '1000px' }}>
        <div
          style={{
            margin: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '1100px',
          }}
        >
          <div className="big_box_card">
            {studies.map(study => (
              <StudyCard study={study} key={study.id} />
            ))}
          </div>
        </div>
        {/* 렌더링 이전에 배열 메서드(filter)를 통해 필터링을 하고 보여준다. */}
        {studies.map(study => (
          <TempCard study={study} key={study.id} />
        ))}

      </div>
    </div>
  )
}

export default MainComponent

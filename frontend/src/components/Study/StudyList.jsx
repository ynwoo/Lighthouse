import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import StudyCard from './StudyCard'
// import { studyAction } from '../../store/study'

function MainComponent({ studies }) {
  // const dispatch = useDispatch()
  // const params = useSelector(state => state.study.params)

  // useEffect(() => {
  //   console.log(params)
  //   dispatch(studyAction.studyList(params))
  //   dispatch(studyAction.getTags())
  // }, [])

  // console.log(sessionStorage.getItem('isLoggedIn'))
  // console.log(studies)

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
            {studies
              ? studies.map(study => <StudyCard study={study} key={study.id} />)
              : 'loading...'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainComponent

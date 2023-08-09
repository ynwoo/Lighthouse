import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import SideComponent from '../components/Utils/SideComponent'
import MainComponent from '../components/Study/StudyList'
import SearchComponent from '../components/Utils/SearchComponent'
import { studyAction } from '../store/study'

const { Footer, Content } = Layout

// 컨텐츠
const contentStyle = {
  textAlign: 'center',
  minHeight: '100%',
  lineHeight: '130%',
  color: '#fff',
  backgroundColor: 'transparent',
  margin: '10px',
}

// 푸터
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
}
// 내부 탭
export default function MainPage({ isLoggedIn }) {
  const dispatch = useDispatch()
  const params = useSelector(state => state.study.params)
  const studies = useSelector(state => state.study.studies)
  console.log(studies)
  useEffect(() => {
    console.log(studies)
    dispatch(studyAction.studyList(params))
    dispatch(studyAction.getTags())
  }, [])

  return (
    <div
      style={
        {
          // backgroundImage: 'linear-gradient(to bottom, #74a3ff, #ffffff 25%',
          // marginTop: '-50px',
        }
      }
    >
      <div className="info_container">
        {/* 사이드바 */}
        <div style={{ height: '100px' }}>
          <div>
            <SideComponent isLoggedIn={isLoggedIn} />
          </div>
        </div>
        {/* 컨텐츠 */}
        <div className="main_item">
          <Content style={contentStyle}>
            <div
              style={{
                // margin: '10px',
                backgroundColor: 'transparent',
                width: '100%',
              }}
            >
              {/* 검색창 */}
              <SearchComponent />
            </div>
            <MainComponent studies={studies} isLoggedIn={isLoggedIn} />
          </Content>
        </div>
        {/* </div> */}
      </div>
      {/* 푸터 */}
      <Footer style={footerStyle}>
        &copy; Lighthouse {new Date().getFullYear()}
      </Footer>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { useDispatch } from 'react-redux'
import SideComponent from '../components/Utils/SideComponent'
import MainComponent from '../components/Study/StudyList'
import SearchComponent from '../components/Utils/SearchComponent'
import { studyAction } from '../store/study'
import { getStudyAll } from '../api/study'

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
  const [studies, setStudies] = useState(null)
  const params = new URLSearchParams(window.location.search)
  const options = {
    page: params.get('page') || 0,
    key: params.get('key'),
    word: params.get('word'),
    orderKey: params.get('order-key') || 'like',
    orderBy: params.get('order-by') || 'desc',
    isOnline: params.get('is-online') || 0,
    tagIds: params.getAll('tagIds') ?? [],
    status: 1,
  }
  console.log('options', options)

  useEffect(() => {
    getStudyAll(
      options,
      ({ data }) => {
        console.log(data)
        setStudies(data.content)
      },
      ({ data }) => {
        console.log(data)
      },
    )
  }, [options])

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

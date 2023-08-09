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

function getCookie(name) {
  const nameOfCookie = `${name}=` // 쿠키=값 의 형태로 되어 있음
  let x = 0
  while (x <= document.cookie.length) {
    // 세션에 있는 쿠키의 총 길이를 가지고 반복
    const y = x + nameOfCookie.length // substring으로 찾아낼 쿠키의 이름 길이 저장
    // eslint-disable-next-line eqeqeq
    if (document.cookie.substring(x, y) == nameOfCookie) {
      // 잘라낸 쿠키와 쿠키의 이름이 같다면 y의 위치로부터 ;값까지 값이 있으면 쿠키의 길이로 적용
      // eslint-disable-next-line no-cond-assign, eqeqeq
      let endOfCookie = document.cookie.indexOf(';', y)
      if (endOfCookie === -1) endOfCookie = document.cookie.length
      return unescape(document.cookie.substring(y, endOfCookie)) // 쿠키 시작점 끝점 찾아 값을 반환
    }
    x = document.cookie.indexOf(' ', x) + 1 //	다음 쿠키 찾기 위해 시작점 반환
    if (x === 0)
      // 쿠키 마지막이면
      break
  }
  return '' // 빈값 리턴
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

  // 구글 소셜 로그인 시 서버로부터 값 받아오기
  const userId = getCookie('user_id')
  const accessToken = getCookie('access_token')
  const refreshToken = getCookie('refresh_token')
  // 세션 스토리지에 데이터 저장
  if (userId !== '') {
    sessionStorage.setItem('userId', userId)
  }
  if (accessToken !== '') {
    sessionStorage.setItem('access_token', accessToken)
    sessionStorage.setItem('isLoggedIn', true)
  }
  if (refreshToken !== '') {
    sessionStorage.setItem('refresh_token', refreshToken)
  }

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
            <MainComponent isLoggedIn={isLoggedIn} />
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

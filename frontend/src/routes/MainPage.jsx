import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import SideComponent from '../components/Utils/SideComponent'
import MainComponent from '../components/Study/StudyList'
import SearchComponent from '../components/Utils/SearchComponent'
import { setParams, studyAction } from '../store/study'
import { CreateButton } from '../components/Study/utils/button'
import NextButton from '../components/Study/utils/button/NextButton'
// import Button from '../components/Study/utils/button/Button'

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

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// 내부 탭
export default function MainPage({ isLoggedIn, status }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [key, setKey] = useState(null)
  const [word, setWord] = useState(null)
  const [orderKey, setOrderKey] = useState('like')
  const [orderBy, setOrderBy] = useState('desc')
  const [isOnline, setIsOnline] = useState(0)
  const [tagIds, setTagIds] = useState(null)

  const options = {
    page,
    key,
    word,
    orderKey,
    orderBy,
    isOnline,
    tagIds,
    status,
  }

  useEffect(() => {
    dispatch(studyAction.studyList(options))
    dispatch(setParams(options))
  }, [page, key, word, orderKey, orderBy, isOnline, tagIds, status])

  const studies = useSelector(state => state.study.studies)
  const totalPage = useSelector(state => state.study.totalPage)
  console.log(studies)

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

    // 쿠키 삭제
    deleteCookie('user_id')
    deleteCookie('access_token')
    deleteCookie('refresh_token')
    window.location.reload()
  }

  const handleChangeKey = () => {
    setKey(key === 'like' ? 'title' : 'like')
  }

  const handleChangeWord = val => {
    setWord(val)
  }

  const handleChangeOrderKey = newOrderKey => () => {
    setOrderKey(newOrderKey)
  }

  const handleChangeOrderBy = newOrderBy => () => {
    setOrderBy(newOrderBy)
  }

  const handleChangeIsOnline = () => {
    setIsOnline(isOnline ? 0 : 1)
  }

  const handleAddTagId = addTagId => () => {
    setTagIds([...tagIds, addTagId])
  }

  const handleDeleteTagId = deleteTagId => () => {
    setTagIds(tagIds.filter(tagId => tagId !== deleteTagId))
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
              <CreateButton>
                이것은 {status === 1 ? '스터디 모집' : '템플릿 선택'}
              </CreateButton>
              {page ? (
                <NextButton onClick={() => setPage(page - 1)}>
                  이것은 이전 페이지
                </NextButton>
              ) : (
                ''
              )}
              {page < totalPage ? (
                <NextButton onClick={() => setPage(page + 1)}>
                  이것은 다음 페이지
                </NextButton>
              ) : (
                ''
              )}
              {/* 검색창 */}
              <SearchComponent
                handleChangeKey={handleChangeKey}
                handleChangeWord={handleChangeWord}
                handleChangeOrderKey={handleChangeOrderKey}
                handleChangeOrderBy={handleChangeOrderBy}
                handleChangeIsOnline={handleChangeIsOnline}
                handleAddTagId={handleAddTagId}
                handleDeleteTagId={handleDeleteTagId}
              />
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

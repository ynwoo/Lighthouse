import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CommentOutlined } from '@ant-design/icons'
import { FloatButton, Layout } from 'antd'
import { useSelector } from 'react-redux'
import Navbar from './components/Utils/Navbar/NavbarNew'
import WaveComponent from './components/Utils/WaveComponent'
import MainPage from './routes/MainPageNew'
import StudyDetailPage from './routes/StudyDetailPageNew'
import UserPage from './routes/UserPage'
import ScrollToTop from './components/Utils/ScrollTop'
import UserEditPage from './routes/UserEditPage'
import Chat from './components/Utils/Chat/Chat'
import SignUp from './components/User/SignUp'
import LogIn from './components/User/LogIn'
import LoadingComponent from './components/Utils/LoadingComponent'
import ChatList from './components/Utils/Chat/ChatList'

const { Footer } = Layout
// 푸터
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
  height: '60px',
}

function App() {
  const login = useSelector(state => state.user.isLoggedIn)
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') || login
  const [showChat, setShowChat] = useState(false)

  const handleChatClick = () => {
    setShowChat(!showChat)
  }

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // 비동기 작업 완료 후 로딩 상태 변경
    setTimeout(() => {
      setIsLoading(false)
    }, 1000) // 예시로 2초 후에 로딩 완료로 설정
  }, [])

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '1000px',
        backgroundColor: 'white',
        boxSizing: 'border-box',
      }}
    >
      <Router>
        <ScrollToTop />
        <div
          style={{
            backgroundColor: 'white',
            position: 'fixed',
            top: 0,
            zIndex: 9999,
            width: '100vw',
            padding: '0 5vw 0 3vw',
          }}
        >
          <Navbar isLoggedIn={isLoggedIn} />
        </div>
        <div className="content" style={{ flex: '1' }}>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <div style={{ marginBottom: '50px' }} />
              <WaveComponent />
              <div style={{ margin: '0vw 10vw' }}>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<MainPage isLoggedIn={isLoggedIn} status={1} />}
                  />
                  <Route
                    path="/templates"
                    element={<MainPage isLoggedIn={isLoggedIn} status={5} />}
                  />
                  <Route
                    path="/study/:id"
                    element={<StudyDetailPage isLoggedIn={isLoggedIn} />}
                  />
                  <Route path="/user/:id" element={<UserPage />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/user_edit/:id" element={<UserEditPage />} />
                  <Route path="/chat" element={<Chat />} />
                  {/* <Route path="/chat1" element={<ChatTest />} /> */}
                </Routes>
              </div>
            </>
          )}
        </div>
      </Router>
      <Footer style={footerStyle}>
        &copy; Lighthouse {new Date().getFullYear()}
      </Footer>
      <FloatButton
        icon={<CommentOutlined style={{ fontSize: '20px' }} />}
        onClick={handleChatClick}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          padding: 0,
          margin: 0,
          zIndex: '1',
          width: '50px',
          height: '50px',
        }}
      />
      {showChat && (
        // 채팅창이 보일 때만 아래 코드가 렌더링됨
        <div
          style={{
            position: 'fixed',
            width: '300px',
            height: '500px',
            bottom: '90px',
            right: '70px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* 채팅창 내용 */}
          <ChatList />
        </div>
      )}
      {/* footer */}
    </div>
  )
}

export default App

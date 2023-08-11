import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CommentOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import Navbar from './components/Utils/Navbar/Navbar'
import WaveComponent from './components/Utils/WaveComponent'
import MainPage from './routes/MainPage'
import StudyDetailPage from './routes/StudyDetailPage'
import TempMorePage from './routes/TempMorePage'
import UserPage from './routes/UserPage'
import ScrollToTop from './components/Utils/ScrollTop'
import UserEditPage from './routes/UserEditPage'
import Chat from './components/Utils/Chat/Chat'
// import chat from './static/chat.png'
import SignUp from './components/User/SignUp'
import SignIn from './components/User/LogIn'
import LoadingComponent from './components/Utils/LoadingComponent'
import ChatList from './components/Utils/Chat/ChatList'

function App() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')
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
        backgroundColor: 'white',
      }}
    >
      <Router>
        <ScrollToTop />
        <Navbar isLoggedIn={isLoggedIn} />

        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <WaveComponent />
            <Routes>
              <Route
                exact
                path="/"
                element={<MainPage isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/temp/:id"
                element={<StudyDetailPage isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/temp"
                element={<TempMorePage isLoggedIn={isLoggedIn} />}
              />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/user_edit/:id" element={<UserEditPage />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </>
        )}
      </Router>
      <button
        type="submit"
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
          // width: '200px',
        }}
        onClick={handleChatClick}
      >
        <FloatButton icon={<CommentOutlined />} />
        {/* <img src={chat} alt="채팅" style={{ width: '100px' }} /> */}
      </button>
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
    </div>
  )
}

export default App

import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingComponent from './components/LoadingComponent'
import Navbar from './components/Utils/Navbar/Navbar'
import WaveComponent from './components/Utils/WaveComponent'
import MainPage from './routes/MainPage'
import TempDetailPage from './routes/TempDetailPage'
import UserPage from './routes/UserPage'
import SignInPage from './routes/SignInPage'
import SignUpPage from './routes/SignUpPage'
import ScrollToTop from './components/Utils/ScrollTop'
import UserEditPage from './routes/UserEditPage'
import Chat from './components/Utils/Chat/Chat'
import chat from './static/chat.png'
import TempMore from './routes/TempMorePage'
import TempCreatePage from './routes/TempCreatePage'
import RouteSwitch from './components/RouteSwitch'

function App() {
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
        <Navbar />
        <WaveComponent />
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <RouteSwitch>
              <Route exact path="/" element={<MainPage />} />
              <Route path="/temp/:id" element={<TempDetailPage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/user_edit/:id" element={<UserEditPage />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/tempmore" element={<TempMore />} />
              <Route path="/tempcreate" element={<TempCreatePage />} />
            </RouteSwitch>
            <Routes /> {/* 이곳에서 Routes 컴포넌트가 위치해야 함 */}
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
        }}
        onClick={handleChatClick}
      >
        <img src={chat} alt="채팅" style={{ width: '100px' }} />
      </button>
      {showChat && (
        // 채팅창이 보일 때만 아래 코드가 렌더링됨
        <div
          style={{
            position: 'fixed',
            width: '200px',
            height: '200px',
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
          채팅창
        </div>
      )}
    </div>
  )
}

export default App

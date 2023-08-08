import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingComponent from './components/LoadingComponent'
import Navbar from './components/Utils/Navbar/Navbar'
import WaveComponent from './components/Utils/WaveComponent'
import MainPage from './routes/MainPage'
import TempDetailPage from './routes/TempDetailPage'
import UserPage from './routes/UserPage'
import ScrollToTop from './components/Utils/ScrollTop'
import UserEditPage from './routes/UserEditPage'
import Chat from './components/Utils/Chat/Chat'
import TempMore from './routes/TempMorePage'
import TempCreatePage from './routes/TempCreatePage'
import RouteSwitch from './components/RouteSwitch'
import ChatList from './components/Utils/Chat/ChatList'
import LogIn from './components/User/LogIn'
import SignUp from './components/User/SignUp'

function App() {
  // const [showChat, setShowChat] = useState(false)

  // const handleChatClick = () => {
  //   setShowChat(!showChat)
  // }

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
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <ScrollToTop />
            <Navbar />
            <WaveComponent />
            <RouteSwitch>
              <Route exact path="/" element={<MainPage />} />
              <Route path="/temp/:id" element={<TempDetailPage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/login" element={<SignIn />} />
              {/* <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/user_edit/:id" element={<UserEditPage />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/tempmore" element={<TempMore />} />
              <Route path="/tempcreate" element={<TempCreatePage />} />
            </RouteSwitch>
            <Routes /> {/* 이곳에서 Routes 컴포넌트가 위치해야 함 */}
          </>
        )}
      </Router>
      <ChatList />
    </div>
  )
}

export default App

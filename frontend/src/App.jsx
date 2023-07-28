import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Utils/Navbar/Navbar'
import WaveComponent from './components/Utils/WaveComponent'
// import Footer from './components/Utils/Footer/Footer'
import MainPage from './routes/MainPage'
import TempDetailPage from './routes/TempDetailPage'
import UserPage from './routes/UserPage'
import SignInPage from './routes/SignInPage'
import SignUpPage from './routes/SignUpPage'

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: 'white',
      }}
    >
      <BrowserRouter>
        <Navbar />
        <WaveComponent />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/temp/:id" element={<TempDetailPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  )
}

export default App

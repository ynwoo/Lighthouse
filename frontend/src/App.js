import './App.css'
import MainPage from './Pages/MainPage'
import TempDetailPage from './Pages/TempDetailPage'
import UserPage from './Pages/UserPage'
import Footer from './components/Utils/Footer/Footer'
import Navbar from './components/Utils/Navbar/Navbar'
import WaveComponent from './components/Utils/WaveComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
          <Route path="/temp" element={<TempDetailPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App

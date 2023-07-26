import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Utils/Navbar/Navbar'
import WaveComponent from './components/Utils/WaveComponent'
// import Footer from './components/Utils/Footer/Footer'
import MainPage from './Routes/MainPage'
import TempDetailPage from './Routes/TempDetailPage'
import UserPage from './Routes/UserPage'
import SignIn from './components/User/SignIn'
import SignUp from './components/User/SignUp'

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
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  )
}

export default App

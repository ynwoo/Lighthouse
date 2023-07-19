import './App.css'
import MainPage from './Pages/MainPage'
import Footer from './components/Utils/Footer/Footer'
import Navbar from './components/Utils/Navbar/Navbar'
import WaveComponent from './components/Utils/WaveComponent'

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: 'white',
      }}
    >
      <Navbar />

      <WaveComponent />
      <MainPage />
      <Footer />
    </div>
  )
}

export default App

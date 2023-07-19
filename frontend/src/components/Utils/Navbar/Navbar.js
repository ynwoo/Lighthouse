import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div
      style={{
        backgroundColor: '#74a3ff',
        height: '80px',
        fontSize: '50px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/"> NavBar </Link>

      <div
        style={{
          margin: '5px',
        }}
      >
        <button>SignIn</button>
        <button>Signout</button>
      </div>
    </div>
  )
}

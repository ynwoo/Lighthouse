import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div
      style={{
        backgroundColor: '#E1EBFF',
        height: '35px',
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/"> NavBar </Link>
      <Link to="/user/fromNavbar"> User </Link>

      <div
        style={{
          margin: '5px',
        }}
      >
        <button type="submit">SignIn</button>
        <button type="submit">Signout</button>
      </div>
    </div>
  )
}

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
      NavBar
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

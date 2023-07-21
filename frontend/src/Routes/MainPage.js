import React, { useContext } from 'react'
import SideComponent from '../components/Utils/SideComponent'
import MainComponent from '../components/Utils/MainComponent'

export default function MainPage() {
  console.log(useContext)
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-4px',
      }}
    >
      <SideComponent />
      <MainComponent />
    </div>
  )
}

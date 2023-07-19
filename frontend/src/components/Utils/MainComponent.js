import React from 'react'
import SearchComponent from './SearchComponent'
import TempList from '../Study/TempList'

export default function MainComponent() {
  return (
    <div
      className="comp"
      style={{
        width: '800px',
        height: '800px',
      }}
    >
      <SearchComponent />
      <h3>MainComponent</h3>

      <TempList />
    </div>
  )
}

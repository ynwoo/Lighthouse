import React from 'react'

export default function SearchComponent() {
  function textChange(e) {
    console.log(e.target.value)
  }
  return (
    <>
      <span>search </span>
      <input type="text" onChange={textChange}></input>
      <button>🔍</button>
      <hr />
    </>
  )
}

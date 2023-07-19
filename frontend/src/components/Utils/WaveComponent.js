import React from 'react'
import logo from '../../static/logo.png'

export default function WaveComponent() {
  return (
    <div>
      <img
        src={logo}
        alt="엑박"
        style={{
          // width: '450x',
          height: '300px',
          marginBottom: '-100px',
          display: 'flex',
        }}
      />

      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 25 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
        style={{
          //   원래 없었던 녀석
          marginBottom: '0px',
        }}
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(116,163,255,0.7)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(116,163,255,0.5)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(116,163,255,0.3)"
          />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#74a3ff" />
        </g>
      </svg>
    </div>
  )
}

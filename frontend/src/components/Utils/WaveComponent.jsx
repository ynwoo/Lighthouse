import React from 'react'
import relogo from '../../static/relogo.png'
// import logo from './'
export default function WaveComponent() {
  return (
    <div>
      <div
        style={{
          top: '50px',
          left: '380px',
          position: 'absolute',
          // zIndex: '99',
          margin: '0px',
        }}
      >
        <div className="fadein">
          <h1>L</h1>
          <h1>I</h1>
          <h1>G</h1>
          <h1>H</h1>
          <h1>T</h1>
          <h1>H</h1>
          <h1>O</h1>
          <h1>U</h1>
          <h1>S</h1>
          <h1>E</h1>
        </div>
        {/* <h1
          style={{
            width: '100%',
            height: '100%',
            webkitFontSmoothing: 'antialiased',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>L</span>
          <span>I</span>
          <span>G</span>
          <span>H</span>
          <span>T</span>
          <span>H</span>
          <span>O</span>
          <span>U</span>
          <span>S</span>
          <span>E</span>
        </h1> */}
      </div>

      <img
        src={relogo}
        alt="엑박"
        style={{
          // width: '450x',
          height: '170px',
          marginBottom: '-40px',
          display: 'flex',
        }}
      />

      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 25 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
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

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './homepage'
import Portfolio from './portfolio'
import Study from './studyhub'

function App() {
  return (
    <div className="body">
      <div className="navbar">
        <h1>Michelle Asongna Akem</h1>
        <div className="navitems">
          <h2>Home</h2>
          <h2>About</h2>
          <h2>Contact</h2>
        </div>
      </div>
      <div>
        <Home/>
        <Portfolio/>
        <Study/>
      </div>
    </div>
  )
}

export default App

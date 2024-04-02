import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './homepage'
import Portfolio from './portfolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "navbar">
      <h1>Michelle Asongna Akem</h1>
      <div className = "navitems">
      <h2>Home</h2>
      <h2>About</h2>
      <h2>Contact</h2>
      </div>
      </div>
      <div>
        <Home/>
        <Portfolio/>
      </div>
    </>
  )
}

export default App

import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import TermekLista from './components/TermekLista'
import RendelesLista from './components/RendelesLista'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <TermekLista/> */}
      <RendelesLista/>
    </>
  )
}

export default App

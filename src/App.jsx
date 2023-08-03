import './App.css'
import { Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons'
import { faMoon as faMoonSolid } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import { useColorMode } from '@chakra-ui/react'
function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <header>
        <Link to={'/'}className='title' >Where in the world?</Link>
        <button className='theme-switcher' onClick={toggleColorMode}>
          <FontAwesomeIcon icon={colorMode === "light" ? faMoonRegular : faMoonSolid} />
          <h1 className='theme-switcher-title'>Dark Mode</h1>
        </button>
      </header>
      <Outlet />
    </>
  )
}

export default App

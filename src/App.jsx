import './App.css'
import { Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-regular-svg-icons'

function App() {
  return (
    <>
      <header>
        <h1 className='title'>Where in the world?</h1>
        <div className='theme-switcher'>
          <FontAwesomeIcon icon={faMoon} />
          <h1 className='theme-switcher-title'>Dark Mode</h1>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default App

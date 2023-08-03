import './App.css'
import { Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
function App() {
  return (
    <>
      <header>
        <Link to={'/'}className='title' >Where in the world?</Link>
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

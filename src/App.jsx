import './App.css'
import CountryCard from './components/CountryCard'

function App() {

  return (
    <>
      <header>
        <h1 className='title'>Where in the world?</h1>
        <div className='theme-switcher'>
          <img className='theme-switcher-icon' />
          <h1 className='theme-switcher-title'>Dark Mode</h1>
        </div>
      </header>
      <main>
        <div className='main-header'>
          <div className='search-wrapper'>
            <img className='search-icon' />
            <input></input>
          </div>
          <div className='filter-wrapper'>
            <select>
              <option></option>
            </select>
          </div>
        </div>
        <div className='main-content'>
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
        </div>
      </main>
    </>
  )
}

export default App

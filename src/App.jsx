import './App.css'
import CountryCard from './components/CountryCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

function App() {
  const [countriesData, setConutriesData] = useState(null)
  const [regionFilter, setRegionFilter] = useState('')

  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all').then(data => data.json()).then(body => setConutriesData(body))
  },[])

  useEffect(()=>{
    if(regionFilter != '')
      fetch(`https://restcountries.com/v3.1/region/${regionFilter}`).then(data => data.json()).then(body => setConutriesData(body))
    else fetch('https://restcountries.com/v3.1/all').then(data => data.json()).then(body => setConutriesData(body))
  }, [regionFilter])

  function handleRegionSelect(e){
    setRegionFilter(e.target.value)
  }
  console.log(regionFilter)
  console.log(countriesData)
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
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
            <input className='search-input' type='text' placeholder='Search for a country...'></input>
          </div>
          <div className='filter-wrapper'>
            <select name="regions" id="region-select" placeholder='Filter by Region' onChange={handleRegionSelect}>
                <option value="">Filter by Region</option>
                <option value="africa">Africa</option>
                <option value="america" >America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="ocania">Ocania</option>
            </select>
          </div>
        </div>
        <div className='main-content'>
          {countriesData && countriesData.map((countryData, i) => <CountryCard key={i} {...countryData}/>)}
          
        </div>
      </main>
    </>
  )
}

export default App

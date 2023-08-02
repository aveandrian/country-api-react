import CountryCard from '../components/CountryCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Spinner, Select } from '@chakra-ui/react'

const regionsData = {
    africa: "Africa",
    america: 'America',
    asia: "Asia",
    europe: "Europe",
    oceania: "Oceania" 
}

export async function loader(){
    let res = await fetch('https://restcountries.com/v3.1/all')
    let data = await res.json()
    return data
}

export default function Home(){
    const [countriesData, setConutriesData] = useState(useLoaderData())
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isRegionFilterOpened, setIsRegionFilterOpened] = useState(false)
    const [regionFilter, setRegionFilter] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function handleSearchInput(e){
        setSearchValue(e.target.value)
    }

    function toggleRegionFilter(){
        setIsRegionFilterOpened(prev => !prev)
    }

    function resetRegionFilter(){
        setRegionFilter('')
    }

    useEffect(() => {
        if(searchValue != "") {
            setIsLoading(true)
            const getData = setTimeout(() => {
                fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
                .then(res => res.ok ? res.json() : setSearchResults(["Nothing found"]))
                .then(data => {
                    setIsLoading(false)
                    setSearchResults(data.map(country => country.name.common))})
                .catch(e => {
                    
                    return setSearchResults(["Nothing found"])})
            }, 500)
        
            return () => clearTimeout(getData)
        }
        else setSearchResults([])
      }, [searchValue])


    function handleOnFocus(){
        if(searchValue != "")
            fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
            .then(res => res.ok ? res.json() : setSearchResults(["Nothing found"]))
            .then(data => setSearchResults(data.map(country => country.name.common)))
            .catch(e => setSearchResults(["Nothing found"]))
    }

    function handleFocusOut(){
        setSearchResults([])
    }

    useEffect(()=>{
      if(regionFilter != '')
        fetch(`https://restcountries.com/v3.1/region/${regionFilter}`).then(data => data.json()).then(body => setConutriesData(body))
      else fetch('https://restcountries.com/v3.1/all').then(data => data.json()).then(body => setConutriesData(body))
    }, [regionFilter])

    function handleRegionSelect(e){
      setRegionFilter(e.target.getAttribute('value'))
    }
    
    return (
        <main>
            <div className='main-header'>
            <div className='search-wrapper'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
                <input className='search-input' type='text' placeholder='Search for a country...' value={searchValue} onChange={handleSearchInput} onFocus={handleOnFocus} onBlur={handleFocusOut}></input>
                {searchResults.length > 0  && 
                    <div className='search-results-wrapper'>
                        {searchResults.map((countryName, i) => 
                        <p className='search-result-item' key={i}>{countryName}</p>
                        )}
                    </div>
                }
                {isLoading && <Spinner className='spinner' thickness='2px'
                    speed='0.8s'
                    size='md'/>}
            </div>
            <div className={`filter-wrapper ${isRegionFilterOpened ? "opened" : ""}`} onClick={toggleRegionFilter}  >
                <p className='filter-input'>{regionFilter != "" ? regionsData[regionFilter] : "Filter by Region"}</p>
                <FontAwesomeIcon icon={faChevronDown} className='arrow-icon' />
                {isRegionFilterOpened && 
                <div className='filter-region' >
                    {regionFilter != "" && <p className='filter-item reset' onClick={resetRegionFilter}>Reset <FontAwesomeIcon icon={faClose} /></p>}
                    {Object.keys(regionsData).map((item, i) => 
                        <p key={i} className='filter-item' onClick={handleRegionSelect} value={item}>{regionsData[item]}</p>)
                    }
                </div>}
            </div>
            </div>
            <div className='main-content'>
            {countriesData && countriesData.map((countryData, i) => <CountryCard key={i} {...countryData}/>)}
            </div>
        </main>
    )
}
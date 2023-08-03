import CountryCard from '../components/CountryCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'

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
    const [isCountriesLoading, setIsCountriesLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState(null)
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
                    setSearchResults(data.map(country => ({ name: country.name.common, code: country.cca3})))})
                .catch(e => {
                    return setSearchResults([{name: "Nothing found", code: ""}])})
            }, 500)
        
            return () => clearTimeout(getData)
        }
        else setSearchResults(null)
      }, [searchValue])


    function handleOnFocus(){
        if(searchValue != "")
            fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
            .then(res => res.ok ? res.json() : setSearchResults(["Nothing found"]))
            .then(data => setSearchResults(data.map(country => ({ name: country.name.common, code: country.cca3}))))
            .catch(e => setSearchResults([{name: "Nothing found", code: null}]))
    }

    function handleFocusOut(){
        const getData = setTimeout(() => {
            setSearchResults(null)
        }, 200)
    }

    useEffect(()=>{
        if(regionFilter != ''){
          setIsCountriesLoading(true)
          fetch(`https://restcountries.com/v3.1/region/${regionFilter}`)
          .then(data => data.json())
          .then(body => {
              setIsCountriesLoading(false)
              setConutriesData(body)
          })
        }
        else {
            setIsCountriesLoading(true)
            fetch('https://restcountries.com/v3.1/all')
            .then(data => data.json())
            .then(body =>{
                setIsCountriesLoading(false)
                setConutriesData(body)
            })
        }
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
                {searchResults  && 
                    <div className='search-results-wrapper'>
                        {searchResults.map((countryName, i) => {
                            return countryName.code ?  
                            <Link className='search-result-item' key={i} to={countryName.code}>{countryName.name}</Link> 
                            : <p key={i} className='search-result-item'>{countryName.name}</p>
                        }
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
                {   
                    !countriesData || isCountriesLoading 
                    ? <div className='loader-wrapper'><p>Countries loading....</p><Spinner thickness='2px'
                    speed='0.8s'
                    size='md' /></div>
                    : countriesData.map((countryData, i) => <CountryCard key={i} {...countryData}/>)
                }
            </div>
        </main>
    )
}
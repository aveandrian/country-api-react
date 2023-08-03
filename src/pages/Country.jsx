import { Suspense, useEffect, useState } from "react"
import { Await, Link, defer, useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import CountryBorders from "../components/CountryBorders";

export async function loader({ params }) {
    console.log(params)
    const res = fetch(`https://restcountries.com/v3.1/alpha/${params.countryName}`).then(res => res.json())
    // const data = res.json()
    return defer({data: res});
  }

export default function Country(){
    const countryData = useLoaderData()
    const navigate = useNavigate()

    function getCurrencies(currencies){
      let arr = []
      for(let key in currencies){
        arr.push(currencies[key].name)
      }
      return arr.join(', ')
    }

    function getLanguages(languages){
      let arr = []
      for(let key in languages){
        arr.push(languages[key])
      }
      return arr.join(', ')
    }

    function getCountryPage(countryData){
      console.log(countryData[0])
      
      const countryInfo = countryData[0]
      const nativeName = Object.values(Object.values(countryInfo.name.nativeName)[0])[0]
      const currencies =  getCurrencies(countryInfo.currencies)
      const languages =  getLanguages(countryInfo.languages)
      return (
        <div className="country-section">
          <img className="flag" src={countryInfo.flags.svg} alt="Country flag"/>
          <div className="country-info">
            <h1 className="country-info-name">{countryInfo.name.common}</h1>
            <div className="country-info-stats">
              <div className="country-stat-item">
                  <p className="country-stat-item-title">Native name:</p>
                  <p className="country-stat-item-value">{nativeName}</p>
              </div>
              <div className="country-stat-item">
                  <p className="country-stat-item-title">Population:</p>
                  <p className="country-stat-item-value">{countryInfo.population.toLocaleString()}</p>
              </div>
              <div className="country-stat-item">
                  <p className="country-stat-item-title">Region:</p>
                  <p className="country-stat-item-value">{countryInfo.region}</p>
              </div>
              <div className="country-stat-item">
                  <p className="country-stat-item-title">Sub Region:</p>
                  <p className="country-stat-item-value">{countryInfo.subregion}</p>
              </div>
              {countryInfo.capital && <div className="country-stat-item">
                  <p className="country-stat-item-title">Capital:</p>
                  <p className="country-stat-item-value">{countryInfo.capital[0]}</p>
              </div>}
              <div className="country-stat-item">
                  <p className="country-stat-item-title">Top Level Domain:</p>
                  <p className="country-stat-item-value">{countryInfo.tld[0]}</p>
              </div>
              <div className="country-stat-item">
                  <p className="country-stat-item-title">Currencies:</p>
                  <p className="country-stat-item-value">{currencies}</p>
              </div>
              <div className="country-stat-item">
                  <p className="country-stat-item-title">Languages:</p>
                  <p className="country-stat-item-value">{languages}</p>
              </div>
            </div>
            {countryInfo.borders && <CountryBorders borders={countryInfo.borders} />}
          </div>
        </div>
        )
    
    }

    return (
      <>
        <main>
        <div className="link-back" onClick={()=>navigate(-1)} ><FontAwesomeIcon icon={faArrowLeftLong} />Back</div>
        <Suspense fallback={<p>Loading...</p>} >
          <Await resolve={countryData.data}>
            {getCountryPage}
          </Await>

        </Suspense>
        </main>
      </>
    )

    
}
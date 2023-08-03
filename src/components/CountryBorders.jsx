import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Spinner } from "@chakra-ui/react"
import '../styles/CountryBorders.css'

export default function CountryBorders({borders}){
    const [isLoading, setIsLoading] = useState(false)
    const [bordersNames, setBordersNames] = useState([])

    useEffect(()=>{
        async function getBorders(){
            setIsLoading(true)
            setBordersNames([])
            let array = [];
            for(let key in Object.keys(borders)){
                let res = await fetch(`https://restcountries.com/v3.1/alpha/${borders[key]}`)
                let data = await res.json()
                array.push(data[0].name.common)
            }
            setBordersNames(array)
            setIsLoading(false)
        }
        getBorders()
    }, [borders])
    
    return (
        <div className="country-borders">
            <p className="country-borders-title">Border Countries:</p>
            <div className="country-borders-container">
                {isLoading 
                ? <Spinner className='spinner' thickness='0.125rem' speed='0.8s' size='md'/>
                : bordersNames.map((border, i) => <Link key={i} to={"../"+borders[i]} className="border-item">{border}</Link>)
                } 
            </div>
        </div>
    )
}
import { useNavigate } from 'react-router-dom'
import '../styles/CountryCard.css'

export default function CountryCard(props){
    const navigate = useNavigate()
    function handleClick(){
        navigate(props.cca3)
    }
    return (
        <div className="country-card" onClick={handleClick}>
            <img className="country-flag-img" src={props.flags.png} alt='Country flag'></img>
            <div className='country-description'>
                <h1 className="country-name">{props.name.common}</h1>

                <div className="country-stats">
                <div className="country-stat-item">
                    <p className="country-stat-item-title">Population:</p>
                    <p className="country-stat-item-value">{props.population.toLocaleString()}</p>
                </div>
                <div className="country-stat-item">
                    <p className="country-stat-item-title">Region:</p>
                    <p className="country-stat-item-value">{props.region}</p>
                </div>
                <div className="country-stat-item">
                    <p className="country-stat-item-title">Capital:</p>
                    <p className="country-stat-item-value">{props.capital}</p>
                </div>
                </div>
            </div>
        </div>
    )
}
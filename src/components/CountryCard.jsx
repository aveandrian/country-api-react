import '../styles/CountryCard.css'

export default function CountryCard(props){
    return (
        <div className="country-card">
            <img className="country-flag-img" src={props.flags.svg}></img>
            <div className='country-description'>


                <h1 className="country-name">{props.name.common}</h1>

                <div className="country-stats">
                <div className="country-stat-item">
                    <p className="country-stat-item-title">Population:</p>
                    <p className="country-stat-item-value">{props.population}</p>
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
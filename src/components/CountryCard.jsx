import '../styles/CountryCard.css'

export default function CountryCard(){
    return (
        <div className="country-card">
            <img className="country-flag-img" src="https://flagcdn.com/fr.svg"></img>
            <div className='country-description'>


                <h1 className="country-name">France</h1>

                <div className="country-stats">
                <div className="country-stat-item">
                    <p className="country-stat-item-title">Population:</p>
                    <p className="country-stat-item-value">67391582</p>
                </div>
                <div className="country-stat-item">
                    <p className="country-stat-item-title">Region:</p>
                    <p className="country-stat-item-value">Europe</p>
                </div>
                <div className="country-stat-item">
                    <p className="country-stat-item-title">Capital:</p>
                    <p className="country-stat-item-value">Paris</p>
                </div>
                </div>
            </div>
        </div>
    )
}
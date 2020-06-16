import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Country({country}){

    const [weatherData, setWeatherData] = useState({})

    

    useEffect(() => {
        console.log('effect')

        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital,
            units: 'm'
          }

        axios
          .get('http://api.weatherstack.com/current', {params})
          .then(response => {
            console.log('promise fulfilled')
            setWeatherData(response.data.current)
            
          })
          // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])


    return (
        <div 
        key={country.name}>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languages</h3> 
            <ul>{country.languages.map(language => 
                <li key={language.name}>{language.name}</li>)}
            </ul>
            <img alt='' src={country.flag}/>
            <h3>Weather in {country.capital}</h3>
            <p><strong>Temperature: </strong>{weatherData['temperature']} Celsius</p>
            <img className='weather' alt='weather-icon' src={weatherData['weather_icons']}/>
            <p><strong>Wind:</strong> {weatherData['wind_speed']} Kilometers/Hour</p>
        </div> 
    )
}

export default Country
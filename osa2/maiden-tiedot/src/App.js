import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Country from './components/Country'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        
      })
  }, [])



  const handleChange = (event) => {
    const newValue = event.target.value
    setSearchValue(newValue)
    const newFilteredCountries = countries.filter(country => country.name.toLowerCase().indexOf(newValue.toLowerCase()) !== -1)
    setFilteredCountries(newFilteredCountries)
  }

  const showOneCountry = (selectedCountry) => {
    const newFilteredCountries = countries.filter(country => country.name === selectedCountry.name)
    setFilteredCountries(newFilteredCountries)
  }


  return (
    <div>
      find countries <input onChange={handleChange} value={searchValue}/>
      {
        filteredCountries.length > 10 || filteredCountries.length === 0 ? <p>Too many matches, specify another filter</p> :
        filteredCountries.length === 1 ? 
        filteredCountries.map(country => <Country key={country.name} country={country}/> ) :
        filteredCountries.map(country => <CountryList key={country.name} country={country} showOneCountry={showOneCountry}/> )
      }
    </div>
  );
}

export default App;



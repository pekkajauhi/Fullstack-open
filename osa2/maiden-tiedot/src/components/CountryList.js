import React from 'react'

function CountryList({country, showOneCountry}){
    
    return (
        <p key={country.name}>{country.name} <button onClick={() => showOneCountry(country)}>show</button></p>
    )
}

export default CountryList
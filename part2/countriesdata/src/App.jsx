import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SpecificCountry from './components/SpecificCountry'
import Countries from './components/Countries'
import Filter from './components/Filter'

const api = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() =>{
    axios
      .get(api)
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  const countriestoShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  const showDetails = (countryName) => {
    const country = countries.find(c => c.name.common === countryName)
    setSelectedCountry(country)
    console.log(selectedCountry)
  }

  return (
    <div>
      <h1>Countries</h1>
      <Filter filter={filter} handleFilterChange={e => setFilter(e.target.value)} />
      {
        countriestoShow.length > 10
          ? (<p>Too many matches, specify another filter</p>)
          : (
            <>
              <Countries countries={countriestoShow} showDetails={showDetails} />
              {selectedCountry && <SpecificCountry specificCountry={selectedCountry} />}
            </>
            )
      }
    </div>
  )
}

export default App

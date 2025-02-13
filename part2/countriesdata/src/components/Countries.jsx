const Countries = ({ countries, showDetails }) => {
    return (
      <div>
        {countries.map(country =>
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={()=>showDetails(country.name.common)}>show</button>
          </div>
        )}
      </div>
    )
  }

export default Countries;
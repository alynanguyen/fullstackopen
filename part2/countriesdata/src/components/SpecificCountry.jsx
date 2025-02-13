import React from 'react';
import Weather from './Weather';

const SpecificCountry = ({specificCountry}) => {

    if(!specificCountry) return null;
    return(
      <div>
        <h1>{specificCountry.name.common}</h1>
        <p>capital {specificCountry.capital[0]}</p>
        <p>area {specificCountry.area}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(specificCountry.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={specificCountry.flags.png} alt="flag" width="100px" />
        <Weather country={specificCountry} />
      </div>
    )
  }

  export default SpecificCountry;
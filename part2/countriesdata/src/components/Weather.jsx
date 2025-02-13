import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {

      if (!country || !country.latlng) return;

      const latitude = country.latlng[0];
      const longitude = country.latlng[1];
      const weather_api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

      axios
        .get(weather_api)
        .then(response => {
          setWeather(response.data.current_weather)
        })
        .catch(error => {
          console.log(error)
        })
    }, [country]);

    return(
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        {weather ? (
          <>
            <p><strong>temperature:</strong> {weather.temperature}°C</p>
            <p><strong>wind:</strong> {weather.windspeed} m/s</p>
          </>
        ) : (
          <p>loading weather...</p>
        )}

      </div>
    )

  }

export default Weather;
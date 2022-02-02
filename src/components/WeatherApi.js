import Spiner from './spiner/Spiner';
import './weather.scss'
import { useState, useEffect } from 'react';

export default function WeatherApi() {


  const [weather, setWeather]= useState({});
  

  useEffect(()=>{
    fetch("https://api.weatherapi.com/v1/current.json?key=b23e4af68e1f4e088d4132115222201&q=Kharkiv&aqi=no")
    .then(res => res.json())
    .then(
      (result) => {
        setWeather({
          isLoaded: true,
          items: result.current
        });
      },
      (error) => {
        setWeather({
          isLoaded: true,
          error
        });
      }
    )
  },[weather])
  

  const myRe = /snow/;

  const style = {
    height: '100%',
    width: '100%',
    display: 'block'
    
  }

    {if (weather.error) {
      return <div>Ошибка: {weather.error.message}</div>
    } else if (!weather.isLoaded) {
      return <Spiner/>;
    } else {
      return (
        <>
          {myRe.exec(weather.items.condition.text) ?
              <>
                <div className="snow1"></div>
                <div className="snow2"></div>
              </>
          :null}
          <span style={style} className={weather.items.is_day? 'day_winter': 'night_winter'}>
            {weather.items.condition.text}
            <img src={weather.items.condition.icon} alt="img" />
            {weather.items.temp_c}
          </span>
        </>
        
      )
    }}


  }

  // condition":{"text":"Sunny","icon":"//cdn.weatherapi.com/weather/64x64/day/113.png"
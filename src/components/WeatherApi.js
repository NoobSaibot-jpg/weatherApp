import Spiner from './spiner/Spiner';
import './weather.scss'
import { useState, useEffect } from 'react';
import cloud1 from './img/cloud-01.png';
import cloud2 from './img/cloud-02.png';
import cloud3 from './img/cloud-03.png';
import cloud4 from './img/cloud-04.png'

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

    if (weather.error) {
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
                <div className="cloud">
                  <img src={cloud1} alt="" className="cloud1"/>
                  <img src={cloud2} alt="" className="cloud2"/>
                  <img src={cloud3} alt="" className="cloud3"/>
                  <img src={cloud4} alt="" className="cloud4"/>
                </div>
              </>
          :null}
          <span style={style} className={weather.items.is_day? 'day_winter': 'night_winter'}>
            <h1 className='weatherText'>{weather.items.condition.text}</h1>
            <img src={weather.items.condition.icon} alt="img" />
            {weather.items.temp_c}
          </span>
        </>
        
      )
    }}

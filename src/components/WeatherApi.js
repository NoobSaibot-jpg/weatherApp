import Spiner from './spiner/Spiner';
import './weather.scss';
import { useState, useEffect } from 'react';
import Clouds from './Clouds/Clouds'
import Rain from './Rain/Rain'
import Fog from './Fog/Fog'
import Sun from './Sun/Sun';
import Snow from './Snow/Snow'
import Title from './Title/Title'


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
    
  },[])

 
 
  const myReCloud = /snow/;
  const myReRain = /rain/;
  const myReFog = /fog/;
  const myReMist = /mist/;
  const myReClear = /Clear/;
  const myReSunny = /Sunny/;

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
        <Title temp = {weather.items.temp_c}/>
          {myReCloud.exec(weather.items.condition.text) ?
              <Snow/>
          :null}
          {myReRain.exec(weather.items.condition.text) ?
              <Rain/>
          :null}
          <span style={style} className={weather.items.is_day? 'day_winter': 'night_winter'}>
            {weather.items.is_day? 
            <Sun/>
             : null} 
                {myReClear.exec(weather.items.condition.text)|| myReSunny.exec(weather.items.condition.text) ?
              null
          :<Clouds/>}
          
            <div className="wraper">
              <h1 className='weatherText'>{weather.items.condition.text}</h1>
              <img src={weather.items.condition.icon} alt="img" />
              <h2 className="temp">{weather.items.temp_c}</h2>
            </div>
            {myReFog.exec(weather.items.condition.text) ?
              <Fog/>
            :null}
            {myReMist.exec(weather.items.condition.text) ?
              <Fog/>
            :null}
          </span>
        </>)}}
import Spiner from './spiner/Spiner';
import './weather.scss';
import { useState, useEffect} from 'react';
import Clouds from './Clouds/Clouds'
import Rain from './Rain/Rain'
import Fog from './Fog/Fog'
import Sun from './Sun/Sun';
import Snow from './Snow/Snow'
import Title from './titleAndIcons/Title'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function WeatherApi() {


  const [value, setValue] = useState('Kharkiv');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [weather, setWeather]= useState({});

  useEffect(()=>{
    fetch(`https://api.weatherapi.com/v1/current.json?key=b23e4af68e1f4e088d4132115222201&q=${value}&aqi=no`)
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
    
  },[value])

 
 
  const myReCloud = /snow/;
  const myReRain = /rain/;
  const myReDrizzle = /drizzle/;
  const myReFog = /fog/;
  const myReMist = /mist/;
  const myReClear = /Clear/;
  const myReSunny = /Sunny/;

  const classes = ()=>{
    if(weather.items.is_day && value ==='Kharkiv'){
      return 'day_kharkiv'
    }else if (!weather.items.is_day && value ==='Kharkiv'){
      return 'night_kharkiv'
    }else if(weather.items.is_day && value ==='Prievidza'){
      return 'day_prievidza'
    }else if(!weather.items.is_day && value ==='Prievidza'){
      return 'night_prievidza'
    }
  }

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
        <div className="citys" style={{position:'absolute', zIndex:'1000', color:'red'}}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">City</FormLabel>
            <RadioGroup
              
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="Kharkiv" control={<Radio />} label="Kharkiv" />
              <FormControlLabel value="Prievidza" control={<Radio />} label="Prievidza" />
            </RadioGroup>
          </FormControl>
        </div>
        <Title temp = {weather.items.temp_c}/>
          {myReCloud.exec(weather.items.condition.text) ?
              <Snow/>
          :null}
          {myReRain.exec(weather.items.condition.text) || myReDrizzle.exec(weather.items.condition.text) ?
              <Rain/>
          :null}
          <span style={style} className={classes()}>
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
            {myReFog.exec(weather.items.condition.text) || myReMist.exec(weather.items.condition.text) ?
              <Fog/>
            :null}
          </span>
        </>)}}
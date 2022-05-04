import { CitiesContext } from './components/Context';
import './app.scss'
import WeatherApi from './components/WeatherApi';
import {useState} from 'react'


function App() {
  const [context, setContext] = useState("Kharkiv");
  
  return (
    <div className="App">
      <CitiesContext.Provider value={[context, setContext]}>
        <WeatherApi/>
      </CitiesContext.Provider>
      
    </div>
  );
}

export default App;

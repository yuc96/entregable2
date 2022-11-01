import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  
  const [weather,setWeather]=useState({});  
  const [degrees,setDesgrees]=useState(true);  
  const [symbol_temp,setsymbol_temp]=useState(); 
  
  const change_degrees=()=>{
          setDesgrees(!degrees) ;
          degrees ? setsymbol_temp("K"):setsymbol_temp("ºC");
          console.log(degrees);
  }

  useEffect(()=>{
    const succes=pos=>{
      let latitude=pos.coords.latitude;
      let longitude=pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e3b59e91772a2b77c08ea9f159c89b93`)
       .then(res=>setWeather(res.data));
       setDesgrees(weather.main?.temp);
       degrees ? setsymbol_temp("K"):setsymbol_temp("ºC");
    }
    navigator.geolocation.getCurrentPosition(succes); 
   
  },[]);
    
  return (
    <div className="App">
      <header className="App-header">
       <div className='wheatherbox'>
          <h1>Aplicación del Clima</h1>
          <h2>Ciudad {weather.name}, {weather.sys?.country}</h2>
          <div className='img_data'>
            <div className='tempimg'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt='img_weather'/>
            <p className='temp'>Temperatura: {degrees ? (weather.main?.temp-273.15).toFixed(2): weather.main?.temp} {symbol_temp} </p> 
            </div>
            <div className='data'>
            <p>Presión: {(weather.main?.pressure*0.0009870).toFixed(2)} atm</p>
            <p>Velocidad del Viento: {weather.wind?.speed} m/s</p>
            <p>Humedad: {weather.main?.humidity} %</p>
            </div> 
          </div>
          <button onClick={change_degrees}>Grados ºC/K</button>
       </div> 
       <></>
      </header>
    </div>
  );
}

export default App;

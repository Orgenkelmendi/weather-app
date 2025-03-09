import { useState } from 'react';
import axios from 'axios';

function App() {
  const [city,setCity] = useState('');
  const [data,setData] = useState(null)

  // const url = `https://weatherapp-api-production.up.railway.app/weather?city=${city}`
  const url = `http://localhost:5001/weather?city=${city}`
  const today = new Date()

  const searchCity = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
        setCity('')
      } catch (error) {
        console.error('Error fetching weather data:',error);
      }
    }
  }
  return (
    <div className='container'>
      <div className='header'>
        <h1>Weather App</h1>
      </div>
      <div className='input'>
        <input
          type='text'
          value={city}
          onChange={(event) => setCity(event.target.value)}
          onKeyDown={searchCity}
          placeholder='Enter city name'
        />
      </div>
      <div className='date'>
        {data ? <h4>{`${data.name}, ${data.sys.country}`}</h4> : null}
        {data ? <p>{`${today.getMonth()+1} / ${today.getDate()} / ${today.getFullYear()}`}</p> : null}
      </div>
      <div className='weather'>
        {data ? <h2>{(data.main.temp).toFixed()} °F <span> {data.weather[0].main}</span></h2> : null}
        {data ? <div className='weatherExtra'>
          <div>
            <p>Feels like:</p>
            {data ? <h2>{(data.main.feels_like).toFixed()} °F</h2> : null}
          </div>
          <div>
            <p>Humidity:</p>
            {data ? <h2>{(data.main.humidity).toFixed()} %</h2> : null}
          </div>
          <div>
            <p>Wind speed:</p>
            {data ? <h2>{(data.wind.speed).toFixed()} mp/h</h2> : null}
          </div>
        </div> : null }
      </div>

    </div>
  );
}

export default App;

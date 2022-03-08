import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Challenge #5
  // Get from local storage, if it exists
  let prevSearch = localStorage.getItem('weathersearch');
  console.log('previous search was:', prevSearch);
  if (!prevSearch) {
    prevSearch = 'Oakland, California'; // set to default for first time
  }

  const [searchBox, setSearchBox] = useState(prevSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherResult, setWeatherResult] = useState({
    location: '',
    temperature: '',
    description: '',
    windSpeed: '',
    humidity: '',
    pressure: '',
  });

  function doFetch() {
    console.log('Hitting refresh', searchBox);
    const query = searchBox;
    // Construct the URL based on what was typed into the search box with
    // string concatenation
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' +
      query + '&appid=0de82b6b4ba5d843dac44bbee4d02543';

    // Turn on "loading" mode -- this displays the spinner
    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Turn off "loading" mode -- this hides the spinner
        setIsLoading(false);
        console.log('receiving data', data);

        if (!data.main) { // 404
          setWeatherResult({
            location: 'Not found.',
            description: '',
          });
          return; // Exit function prematurely
        }

        // Do state set for real data
        setWeatherResult({
          location: data.name,
          temperature: Math.round(data.main.temp - 273),
          description: data.weather[0].main,
          windSpeed: Math.round(data.wind.speed),
          humidity: Math.round(data.main.humidity),
          pressure: Math.round(data.main.pressure),
        });
      });
  }

  // useEffect hook: Do the "doFetch" whenever we first load
  useEffect(doFetch, []);

  // Whenever the search box gets changed, set the localStorage
  useEffect((ev) => {
    // Challenge #4
    console.log('Seach box being changed:', searchBox);
    localStorage.setItem('weathersearch', searchBox);
  }, [searchBox]);

  // Challenge 1
  useEffect(() => {
    console.log('App is first mounted: useEffect with []');
  }, []);
  useEffect(() => {
    console.log('App is was just rerendered: useEffect with no args');
  });
  console.log('rerendering');

  return (
    <div className='App App--clear'>
      <div className="WeatherDashboard">
        {isLoading ? <div className="loading"></div> : null}
        <div className="WeatherDashboard-location">
          {weatherResult.location}
        </div>

        <div className="WeatherDashboard-overview">
          <span className="WeatherDashboard-temperature">
            {weatherResult.temperature}° <span>C</span>
          </span>
          <div className="WeatherDashboard-description">{weatherResult.description}</div>
        </div>
        <div className="WeatherDashboard-details">
          <div className="WeatherDashboard-label">Wind</div>
          <div className="WeatherDashboard-data">{weatherResult.windSpeed} <span>km/h</span></div>
          <div className="WeatherDashboard-label">Humidity</div>
          <div className="WeatherDashboard-data">{weatherResult.humidity} <span>%</span></div>
          <div className="WeatherDashboard-label">Pressure</div>
          <div className="WeatherDashboard-data">{weatherResult.pressure}</div>
        </div>
        <div className="Controls">
          <input
            placeholder="Enter location name"
            value={searchBox}
            onChange={ev => setSearchBox(ev.target.value)} />
          <button onClick={doFetch}>Refresh</button>
        </div>
      </div>
    </div>
  );
}

export default App;

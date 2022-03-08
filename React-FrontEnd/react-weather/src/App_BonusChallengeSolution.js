/*
  NOTE: To try out this version of the app, go to index.js and switch which one
  of these two files is being imported vs commented out.
  (Or, just rename this to App.js... that works too!)
*/
import React, { useState, useEffect } from 'react';
import './App.css';

function generateClassNameForApp(description) {
  // Helper function used to guess what type of weather this is so we can use
  // the appropriate class to style the background conditionally based on the
  // weather that we have
  if (!description) {
    // If no description is provided, just return the default
    return 'App App--clear';
  }
  const appClasses = ['App'];
  const desc = description.toLowerCase();
  if (desc.includes('clear')) {
    appClasses.push('App--clear');
  } else if (desc.includes('cloud')) {
    appClasses.push('App--cloud');
  } else if (desc.includes('storm')) {
    appClasses.push('App--storm');
  } else if (desc.includes('rain')) {
    appClasses.push('App--rain');
  }
  return appClasses.join(' ');
}

function App() {
  // Get from local storage, if it exists
  let prevSearch = localStorage.getItem('weathersearch');
  if (!prevSearch) {
    prevSearch = 'Oakland, California'; // set to default for first time
  }

  const [searchBox, setSearchBox] = useState(prevSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [weatherResult, setWeatherResult] = useState({
    location: '',
    temperature: '',
    description: '',
    windSpeed: '',
    humidity: '',
    pressure: '',
  });

  function doFetch() {
    console.log('hitting refresh', searchBox);
    const query = searchBox.replace(/ /g, '+');
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' +
      query + '&appid=0de82b6b4ba5d843dac44bbee4d02543';

    setShowControls(false);
    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('receiving data', data);

        // 404
        if (!data.main) {
          setIsLoading(false);
          setWeatherResult({
            location: 'Not found.',
          });
          return;
        }

        // Do state set for real data
        setWeatherResult({
          location: data.name,
          temperature: Math.round(data.main.temp - 273),
          description: data.weather[0].main,
          windSpeed: Math.round(data.wind.speed),
          humidity: Math.round(data.main.humidity),
          pressure: Math.round(data.main.pressure),
          isLoading: false,
        });
      });
  }

  function showEdit() {
    setShowControls(true);
  }

  // Whenever the search box gets changed, set the localStorage
  useEffect((ev) => {
    localStorage.setItem('weathersearch', searchBox);
  }, [searchBox]);

  // Run doFetch when we start
  useEffect(doFetch, []);

  // Invoke the generateClassNameForApp function to create the App App--clear
  // type class name for the App div
  const appClassName = generateClassNameForApp(weatherResult.description);
  return (
    <div className={appClassName}>
      <div className="WeatherDashboard">
        {isLoading ? <div className="loading"></div> : null}
        {showControls ? (
          <div className="WeatherDashboard-location">
            <input placeholder="Enter location name"
              value={searchBox}
              onChange={ev => setSearchBox(ev.target.value)} />
            <button onClick={doFetch}>Save</button>
          </div>
        ) : (
          <div className="WeatherDashboard-location">
            <span>{weatherResult.location}</span>
            <button onClick={showEdit}>Edit</button>
          </div>
        )
        }
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
      </div>
    </div>
  );
}

export default App;

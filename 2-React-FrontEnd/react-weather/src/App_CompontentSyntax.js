/*
  NOTE:  This is using a different syntax that utilizes OOP than we learned in
  class, but we left it in here just so you can get a peak! (we'll cover this
  again later)
*/
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    searchBox: '',
    description: '',
    isLoading: false,
  }

  doFetch = () => {
    console.log('hitting refresh', this.state.searchBox);
    const query = this.state.searchBox.replace(/ /g, '+');
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' +
      query + '&appid=0de82b6b4ba5d843dac44bbee4d02543';
    this.setState({
      showControls: false,
      isLoading: true,
    });
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('receiving data', data);

        // 404
        if (!data.main) {
          this.setState({
            location: "Not found.",
            description: "",
            isLoading: false,
          });
          return;
        }

        // Do state set for real data
        this.setState({
          location: data.name,
          temperature: Math.round(data.main.temp - 273),
          description: data.weather[0].main,
          windSpeed: Math.round(data.wind.speed),
          humidity: Math.round(data.main.humidity),
          pressure: Math.round(data.main.pressure),
          isLoading: false,
        });

        // Save to localStorage
        localStorage.setItem('weathersearch', this.state.searchBox);
      });
  }

  componentDidMount = (ev) => {
    // Restore from local storage, if available
    let prevSearch = localStorage.getItem('weathersearch');
    if (!prevSearch) {
      prevSearch = 'Oakland, California';
    }
    this.setState({searchBox: prevSearch}, this.doFetch);
  }

  onSearchBoxChange = (ev) => {
    this.setState({searchBox: ev.target.value});
  }

  showEdit = () => {
    this.setState({
      showControls: true,
    });
  }

  render() {

    // Guess what type of weather this is so we can use the
    // appropriate class to style the background conditionally based
    // on the weather that we have
    const appClasses = ['App'];
    const desc = this.state.description.toLowerCase();
    if (desc.includes('clear')) {
      appClasses.push('App--clear');
    } else if (desc.includes('cloud')) {
      appClasses.push('App--cloud');
    } else if (desc.includes('storm')) {
      appClasses.push('App--storm');
    } else if (desc.includes('rain')) {
      appClasses.push('App--rain');
    }

    return (
      <div className={appClasses.join(' ')}>
        <div className="WeatherDashboard">
          {this.state.isLoading ? <div className="loading"></div> : null}
          {this.state.showControls ? (
            <div className="WeatherDashboard-location">
              <input placeholder="Enter location name"
                value={this.state.searchBox}
                onChange={this.onSearchBoxChange} />
              <button onClick={this.doFetch}>✓</button>
            </div>
          ) : (
            <div className="WeatherDashboard-location">
              <span>{this.state.location}</span>
              <button onClick={this.showEdit}>🖉</button>
            </div>
          )
          }
          <div className="WeatherDashboard-overview">
            <span className="WeatherDashboard-temperature">
              {this.state.temperature}° <span>C</span>
            </span>
            <div className="WeatherDashboard-description">{this.state.description}</div>
          </div>
          <div className="WeatherDashboard-details">
            <div className="WeatherDashboard-label">Wind</div>
            <div className="WeatherDashboard-data">{this.state.windSpeed} <span>km/h</span></div>
            <div className="WeatherDashboard-label">Humidity</div>
            <div className="WeatherDashboard-data">{this.state.humidity} <span>%</span></div>
            <div className="WeatherDashboard-label">Pressure</div>
            <div className="WeatherDashboard-data">{this.state.pressure}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

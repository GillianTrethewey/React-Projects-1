import React, { Component } from 'react'
import { render } from 'react-dom'

class Water extends Component {

  state = { currentTemp: 10 }

  setTemperature = function(e) {
    this.setState({ currentTemp: e.target.value });
  }

  render() {
    var stateOfMatter;

    // If temp is on/below freezing, it's a solid 
    if (this.state.currentTemp <= 32) {
      stateOfMatter = 'Solid';

      // if temp is on/above boiling, it's a gas
    } else if (this.state.currentTemp >= 212) {
      stateOfMatter = 'Gas';

      // otherwise it's just a liquid
    } else {
      stateOfMatter = 'Liquid';
    }
    return (
      <div>
        <input type="text" onChange={this.setTemperature.bind(this)} value={this.state.currentTemp} />
        <p>At {this.state.currentTemp}°F, water is considered to be a "{stateOfMatter}" state of matter.</p>
      </div>
    )
  }
}

class App extends Component {
  render() {
    const style = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }

    return (
      <div style={style}>
        <Water />
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))

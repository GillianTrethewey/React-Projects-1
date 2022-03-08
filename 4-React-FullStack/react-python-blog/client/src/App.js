import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import Welcome from './components/pages/Welcome/Welcome.js';
import About from './components/pages/About/About.js';
import Blog from './components/pages/Blog/Blog.js';
import Contribute from './components/pages/Contribute/Contribute.js';
import SingleBlogPost from './components/pages/SingleBlogPost/SingleBlogPost.js';

function App() {

  return (
    <div className="App">
      <div className="App-navigation">
        <h1 className="App-title">Allergy Blog</h1>
        <Link to="/">Welcome</Link>
        <Link to="/about/">About</Link>
        <Link to="/blog/">Blog</Link>
        <Link to="/contribute/">Contribute</Link>
      </div>

      <div className="App-mainContent">

        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route exact path='/about/' component={About} />
          <Route exact path='/blog/' component={Blog} />
          <Route exact path='/contribute/' component={Contribute} />
          <Route exact path='/post/:index' component={SingleBlogPost} />
        </Switch>

      </div>

      <div className="App-sidebar">
        <img src="https://i.imgur.com/9iZAYQu.png" alt="steth" />
        <p>Do you have food allergies? Do you know someone with food
          allergies, or prepare food for people who might have allergies?
          Knowing which allergies to watch out for is essential for keeping
          people healthy and averting possibly life-threatening
          disasters.</p>
      </div>

    </div>
  );
}

export default App;

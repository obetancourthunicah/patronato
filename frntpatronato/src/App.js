import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './components/Content/Home';
import SignIn from './components/Content/SignIn';
import Votes from './components/Content/Votes';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/votes" component={Votes} exact />
          <Route path="/signin" component={SignIn} exact />
      </Switch>
    </Router>
    
  );
}

export default App;

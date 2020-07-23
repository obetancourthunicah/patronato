import React , {Component} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

import {setJWT, getLocalStorage, setLocalStorage} from './utilities/axios';

import './App.css';

import Home from './components/Content/Home';
import SignIn from './components/Content/SignIn';
import Votes from './components/Content/Votes';

export default class extends Component{
  constructor (){
    super();
    this.state = {
      user: getLocalStorage('user') || {},
      jwt: getLocalStorage('jwt') || "",
      isLogged:false,
      loadingBackend:false
    }
    if(this.state.jwt !== ""){
      setJWT(this.state.jwt);
      this.state.isLogged = true;
    }
  }
  render() {
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
}

import React , {Component} from 'react';
import {Switch, BrowserRouter as Router} from 'react-router-dom';
import PRoute from './utilities/privateroutes';
import NRoute from './utilities/normalroutes';

import {setJWT, getLocalStorage, setLocalStorage, setUnAuthInterceptor} from './utilities/axios';

import './App.css';



import Home from './components/Content/Home';
import Login from './components/Content/LogIn';
import SignIn from './components/Content/SignIn';
import Votes from './components/Content/Votes';
import Alumnos from './components/Content/Alumnos/alumnos';

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
    this.setLogginData = this.setLogginData.bind(this);
    this.setLoggoutData = this.setLoggoutData.bind(this);
    
    setUnAuthInterceptor(this.setLoggoutData)
  }

  componentDidMount(){
    this.setState({"loadingBackend":true});
  }
  setLogginData(user, jwt){
    this.setState({
      ...this.state,
      user:user,
      jwt:jwt,
      isLogged:true,
      },
      () => {
        setLocalStorage('jwt', jwt);
        setLocalStorage('user', user);
        setJWT(jwt);}
    );
  }
  setLoggoutData(){
    if(this.state.loadingBackend){
      this.setState(
        {
          ...this.state,
          user:"",
          jwt:"",
          isLogged:false,
        },
        ()=>{setJWT('')}
      )
    }else{
      this.state = {
        ...this.state,
        user: "",
        jwt: "",
        isLogged: false,
      }
      setJWT('')
    }
  }
  render() {
    if (!this.state.loadingBackend){
      return (<div className="splash"> ...Loading </div>)
    }
    const auth = {
      isLogged : this.state.isLogged,
      login: this.setLogginData,
      logout: this.setLoggoutData,
    }
    return (
      <Router>
        <Switch>
          <NRoute path="/" component={Home} exact auth={auth}/>
          <NRoute path="/login" component={Login} exact auth={auth}/>
          <NRoute path="/signin" component={SignIn} exact auth={auth} />
          <PRoute path="/votes" component={Votes} exact auth={auth} />
          <PRoute path="/alumnos" component={Alumnos} exact auth={auth} />
        </Switch>
      </Router>
    );
  }
}

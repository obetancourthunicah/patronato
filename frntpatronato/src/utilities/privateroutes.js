import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default (props)=>{
  const { component: MyCustomComponent, auth, ...rest } = props;
  return (
    <Route
      {...rest}
      component = {
        (props) => {
          return (
            (auth.isLogged) ? (<MyCustomComponent {...props} auth={auth} />) : (<Redirect to={{pathname:"/login", state:{from:props.location}}} />)
          )
        }
      }
    />
  )
}

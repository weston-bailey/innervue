import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // get user via jwt token to confirm user authenticated
  const user = localStorage.getItem('jwtToken')
  
  // setup a return based on user status
  return <Route {...rest} render={(props) => (
    user ? <Component {...rest} {...props} /> : <Redirect to='/login' />
  )} />
}

export default PrivateRoute;
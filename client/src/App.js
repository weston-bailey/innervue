import React, { useState, useEffect, Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import NavBar from './wrappers/NavBar'
import Footer from './wrappers/Footer';
import Home from './content/pages/Home';
import GetFeedback from './content/pages/GetFeedback';
import Login from './content/pages/Login';
import MyResponses from './content/pages/MyReponses';
import SignupPage from './content/pages/SignupPage'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import CareerTips from './content/pages/CareerTips';


const PrivateRoute = ({ component: Component, ...rest }) => {
  // get user via jwt token to confirm user authenticated
  const user = localStorage.getItem('jwtToken')
  
  // setup a return based on user status
  return <Route {...rest} render={(props) => (
    user ? <Component {...rest} {...props} /> : <Redirect to='/login' />
  )}
  />
}

function App() {
  // current user state
  let [currentUser, setCurrentUser] = useState('');
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [analysis, setAnalysis] = useState(false);
  useEffect( () => {
    let token;
    if(localStorage.getItem('jwtToken') === null ) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  // setting current user
  let nowCurrentUser = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }
  // logging out current user
  let handleLogout = () => {
    if (localStorage.getItem('jwtToken') !== null) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  // console.log('current user is:', currentUser)
  // console.log('is user authenticated:', isAuthenticated)

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar handleLogout={handleLogout} isAuthenticated={isAuthenticated} setAnalysis={setAnalysis}/>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path='/myresponses' component={MyResponses} user={currentUser} />
        <PrivateRoute exact path='/feedback' component={GetFeedback} user={currentUser} analysis={analysis} setAnalysis={setAnalysis}/>
        {/* <Route exact path='/feedback' component={GetFeedback} /> */}
        <Route exact path='/login' render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} /> } />
        <Route exact path='/signup' render={ (props) => <SignupPage {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} /> } />
        {/* <Route exact path='/signup' component={SignupPage} /> */}
        <Route exact path='/tips' component={CareerTips} />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import NavBar from './wrappers/NavBar'
import Header from './wrappers/Header';
import Footer from './wrappers/Footer';
import Home from './content/pages/Home';
import GetFeedback from './content/pages/GetFeedback';
import Login from './content/pages/Login';
import MyResponses from './content/pages/MyReponses';
import SignupPage from './content/pages/SignupPage'
import CareerTips from './content/pages/CareerTips';


function App() {
  return (
    <div>
      <NavBar />
      <Header />
      <Route exact path="/" component={Home} />
        <Route exact path='/myresponses' component={MyResponses} />
        <Route exact path='/feedback' component={GetFeedback} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignupPage} />
        <Route exact path='/tips' component={CareerTips} />
      <Footer />
    </div>
  );
}

export default App;

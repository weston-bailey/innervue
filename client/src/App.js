import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import NavBar from './wrappers/NavBar'
import Header from './wrappers/Header';
import Footer from './wrappers/Footer';
import Home from './content/pages/Home';
import GetFeedback from './content/pages/GetFeedback';
import LoginSignup from './content/pages/LoginSignup';
import MyResponses from './content/pages/MyReponses';


function App() {
  return (
    <div>
      <NavBar />
      <Header />
      <Route exact path="/" component={Home} />
        <Route exact path='/myresponses' component={MyResponses} />
        <Route exact path='/feedback' component={GetFeedback} />
        <Route exact path='/login' component={LoginSignup} />
      <Footer />
    </div>
  );
}

export default App;

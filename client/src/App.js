import React from 'react';
import './App.css';
import NavBar from './wrappers/NavBar'
import Header from './wrappers/Header';
import Footer from './wrappers/Footer';
import { Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar />
      <Header />
      <Switch>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

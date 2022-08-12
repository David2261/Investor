import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
    <Router>
    <Navbar />
    <Switch>
      <Route path='/' exact />
    </Switch>
    </Router>
    Hello
    </div>
  );
}

export default App;
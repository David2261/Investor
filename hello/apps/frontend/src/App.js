import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <>
      <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact />
      </Switch>
      </Router>
      </>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
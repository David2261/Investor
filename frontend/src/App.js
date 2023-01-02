import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home'
import {About} from './pages/About'


function App() {
  return (
    <BrowserRouter >
    <div className="container pt-4">
      <Routes >
        <Route path={'/'} exact component={Home} />
        <Route path={'/about'} component={About} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

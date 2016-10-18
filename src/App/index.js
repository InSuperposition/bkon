import React from 'react';
import { BrowserRouter as Router } from 'react-router';
// normalize.css is a react-toolbox dependency
import 'normalize.css/normalize.css';
// Import App base styles
// fonts, basic CSS resets
import { container } from './App.css';
import Nav from './Nav';
import Main from './Main';

const App = () => (
  <Router>
    <div className={container} >
      <Nav />
      <Main />
    </div>
  </Router>
);


export default App;

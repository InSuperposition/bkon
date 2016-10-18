import React from 'react';
import 'normalize.css/normalize.css';
// Import App base styles
// fonts, basic CSS resets
import { container } from './App.css';
import Nav from './Nav';
import Main from './Main';

const App = () => (
  <div className={container} >
    <Nav />
    <Main />
  </div>
);


export default App;

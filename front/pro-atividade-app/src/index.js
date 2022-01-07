import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import 'bootswatch/dist/lumen/bootstrap.min.css'; 
import { BrowserRouter as Router } from 'react-router-dom';
/**
 * morph
 * quartz
 * cosmo
 * lumen
 * cerulean
 * darkly
 * spacelab
 */

ReactDOM.render( 
  <Router>
    <Menu/>
      <div className="container" > 
        <App />
      </div>
  </Router>,
  document.getElementById('root')
);


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import 'bootswatch/dist/lumen/bootstrap.min.css'; 

ReactDOM.render( 
  <>
  <Menu/>
  <div className="container" > 
    <App />
  </div>
  </>,
  document.getElementById('root')
);


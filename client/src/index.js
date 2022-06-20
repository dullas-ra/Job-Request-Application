import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from './App';
import Register from './screens/Register'

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path ='/' exact render = {props => <App {...props} />}/>
        <Route path ='/register' exact render = {props => <Register {...props} />}/>
      </Switch>
    </BrowserRouter>,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


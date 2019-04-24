import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import Error404 from './Error404';
import Body from './Body';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Body} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default App;

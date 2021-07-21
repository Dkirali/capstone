import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserData from './components/UserData/UserData';
import HomePage from './components/HomePage/HomePage';

// const baseUrl = 'http://localhost:8080/api/users';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/questions/:id" component={UserData} />
            <Route exact path="/homepage/:id" component={HomePage} />
          </Switch>
      </BrowserRouter>
    )
  }
}

export default App


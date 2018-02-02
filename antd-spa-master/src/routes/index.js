import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Static from '../components/static/Static';
import Home from '../components/common/home';
import App from '../components/app/App';
import NoMatch from '../components/common/404';
import Login from '../components/login/Login';

class MRoute extends Component {
  render() {
    return (
      <Router history={Static.history}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route  path="/app" component={App}/>
          <Route  path="/login" component={Login}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    );
  }
}

export default MRoute;
import React, { Component } from 'react';
import { Route, Router, browserHistory,IndexRoute } from 'react-router';
import Home from './components/Home';
import App from './App.js';
import Topic from './components/Topic.js';
import User from './components/User.js';
class Routers extends Component {
    
    render() {
    return (
      <Router history={browserHistory}>
      
      <Route path="/" component={App}>
      <IndexRoute  component={Home} />
      <Route path='topic/:id' component={Topic}/>
      <Route path='user/:loginname' component={User}/>
      </Route>

      </Router>
      
    );
  }
}

export default Routers;
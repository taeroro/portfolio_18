import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';

import Header from './Header/Header';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header {...this.props} />
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);

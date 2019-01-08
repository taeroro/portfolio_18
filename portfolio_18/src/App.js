import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';

import Header from './Header/Header';
import Routes from './Routes';
import Footer from './Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header {...this.props} />
        <Routes />
        <Footer {...this.props} />
      </div>
    );
  }
}

export default withRouter(App);

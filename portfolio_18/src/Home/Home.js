import React, { Component } from 'react';
// import { NavLink } from "react-router-dom";
import './Home.css';

export default class Home extends Component {
  renderCornerLines() {
    return (
      <div className="home-corner-lines">
        <div className="corner-line-tl"></div>
        <div className="corner-line-tr"></div>
        <div className="corner-line-br"></div>
        <div className="corner-line-bl"></div>
      </div>
    );
  }

  renderAbout() {
    return (
      <div className="home-container about-container">
        
      </div>
    );
  }

  renderWork() {
    return (
      <div className="home-container work-container">
        WORK
      </div>
    );
  }

  renderContact() {
    return (
      <div className="home-container contact-container">
        CONTACT
      </div>
    );
  }

  render() {
    return (
      <div className="home-main-container">
        {this.renderCornerLines()}

        {this.renderAbout()}
        {this.renderWork()}
        {this.renderContact()}
      </div>
    );
  }
}

import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
  // TODO: change normal scroll to this scroll
  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll, { passive: true })
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }
  //
  // handleScroll(event) {
  //   // do something like call `this.setState`
  //   // access window.scrollY etc
  // }


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

  renderSideLabel() {
    return (
      <div className="home-side-label-container">
        <div className="side-label-text">01 ABOUT</div>
        <div className="side-label-line"></div>
      </div>
    );
  }

  renderShapes() {
    // TODO
    return (
      <div className="home-random-shapes">

      </div>
    );
  }

  renderAbout() {
    return (
      <div className="home-container about-container">
        {this.renderShapes()}

        <div className="about-text-container">
          <h1>HI,</h1>
          <h1>THIS IS RYAN FAN,</h1>
          <h1>A DESIGNER / SW ENGINEER.</h1>
          <h1>INTERSTED IN UI / UX DESIGN.</h1>
        </div>
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
        {this.renderSideLabel()}

        {this.renderAbout()}
        {this.renderWork()}
        {this.renderContact()}
      </div>
    );
  }
}

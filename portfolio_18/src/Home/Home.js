import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowHeight: window.innerHeight,
      prevY: 0
    };

    this.scrollingTest = false;

    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef3 = React.createRef();

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
    this.preventDefaultForScrollKeys = this.preventDefaultForScrollKeys.bind(this);
    this.disableScroll = this.disableScroll.bind(this);
    this.enableScroll = this.enableScroll.bind(this);
    this.wheelEvent = this.wheelEvent.bind(this);
  }

  // TODO: change normal scroll to this scroll
  componentDidMount() {
    this.disableScroll();
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('wheel', debounce(this.wheelEvent, 20, {
      'leading': true,
      'trailing': false
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('wheel', this.wheelEvent);
  }

  updateWindowDimensions() {
    this.setState({ windowHeight: window.innerHeight });
  }

  wheelEvent(event) {
    // Scrolling down
    if (!this.scrolling && event.wheelDeltaY < 0) {
      if (window.scrollY < this.state.windowHeight) {
        this.scrolling = true;
        window.scrollTo({
            top: this.myRef2.current.offsetTop,
            behavior: "smooth"
        });
        this.scrolling = false;
      }
      else if (this.state.windowHeight <= window.scrollY && window.scrollY < 2 * this.state.windowHeight) {
        this.scrolling = true;
        window.scrollTo({
            top: this.myRef3.current.offsetTop,
            behavior: "smooth"
        });
        this.scrolling = false;
      }
    }
    // Scrolling up
    else if (!this.scrolling && event.wheelDeltaY > 0) {
      if (this.state.windowHeight <= window.scrollY && window.scrollY < 2 * this.state.windowHeight) {
        this.scrolling = true;
        window.scrollTo({
            top: this.myRef1.current.offsetTop,
            behavior: "smooth"
        });
        this.scrolling = false;
      }
      else if (2 * this.state.windowHeight <= window.scrollY && window.scrollY < 3 * this.state.windowHeight) {
        this.scrolling = true;
        window.scrollTo({
            top: this.myRef2.current.offsetTop,
            behavior: "smooth"
        });
        this.scrolling = false;
      }
    }
  }

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
  }

  preventDefaultForScrollKeys(e) {
    const keys = {37: 1, 38: 1, 39: 1, 40: 1};
      if (keys[e.keyCode]) {
          this.preventDefault(e);
          return false;
      }
  }

  disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove  = this.preventDefault; // mobile
    document.onkeydown  = this.preventDefaultForScrollKeys;

    this.setState({ disabled: true });
  }

  enableScroll() {
      if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
  }


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
      <div className="home-container about-container" ref={this.myRef1}>
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
      <div className="home-container work-container" ref={this.myRef2}>
        WORK
      </div>
    );
  }

  renderContact() {
    return (
      <div className="home-container contact-container" ref={this.myRef3}>
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

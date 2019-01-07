import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import smoothscroll from 'smoothscroll-polyfill';
import './Header.css';

const logo_img_src = "/Portfolio_1.svg";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
      scrollPassNavbar: false,
      scrollUp: false
    };

    this.wheelEvent = this.wheelEvent.bind(this);

    this.debounceWheelEvent = debounce(this.wheelEvent, 34, {
      'leading': true,
      'trailing': false
    });
  }

  componentDidMount() {
    smoothscroll.polyfill();

    document.addEventListener('scroll', () => {
      const scrollPassNavbar = window.scrollY > 45;
      if (scrollPassNavbar !== this.state.scrollPassNavbar) {
        this.setState({ scrollPassNavbar });
      }
    }, true);
    window.addEventListener('wheel', this.debounceWheelEvent);
  }

  componentWillMount() {
    this.setState({ path: this.props.location.pathname });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.location.pathname });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', true);
    window.removeEventListener('wheel', this.debounceWheelEvent);
  }

  wheelEvent(event) {
    if (event.deltaY < 0) {
      this.setState({ scrollUp: true });
    }
    else {
      this.setState({ scrollUp: false });
    }
  }

  render() {
    switch (this.state.path) {
      case String(this.state.path.match(/.*digital.+/)):
      case String(this.state.path.match(/.*illustration.+/)):
        return (
          <div className={this.state.scrollPassNavbar && !this.state.scrollUp ? "header-container header-work header-hidden" : "header-container header-work"}>
            <a href="/">
              <img className={"header-logo-img"} src={logo_img_src} alt="logo" />
            </a>
          </div>
        );
      case "/":
        return (
          <div className="header-container">
            <a href="/">
              <img className={"header-logo-img"} src={logo_img_src} alt="logo" />
            </a>
          </div>
        );
      default:
        return (
          <div className={this.state.scrollPassNavbar && !this.state.scrollUp ? "header-container header-hidden" : "header-container"}>
            <a href="/">
              <img className={"header-logo-img"} src={logo_img_src} alt="logo" />
            </a>
          </div>
        );
    }
  }
}

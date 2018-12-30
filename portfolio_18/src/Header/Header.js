import React, { Component } from 'react';
import './Header.css';

const logo_img_src = "/Portfolio_1.svg";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: "",
    };
  }

  componentWillMount() {
    this.setState({ path: this.props.location.pathname });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ path: nextProps.location.pathname });
  }

  render() {
    switch (this.state.path) {
      case String(this.state.path.match(/.*digital.+/)):
        return (
          <div className="header-container header-work">
            <a href="/work/digital">
              <img className={"header-logo-img"} src={logo_img_src} alt="logo" />
            </a>
          </div>
        );
      default:
        return (
          <div className="header-container">
            <a href="/">
              <img className={"header-logo-img"} src={logo_img_src} alt="logo" />
            </a>
          </div>
        );
    }
  }
}

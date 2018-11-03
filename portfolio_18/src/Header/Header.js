import React, { Component } from 'react';
import './Header.css';

const logo_img_src = "/Portfolio_1.svg";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
        <div className="header-container">
          <a href="/">
            <img className={"header-logo-img"} src={logo_img_src} alt="logo" />
          </a>
        </div>
    );
  }
}

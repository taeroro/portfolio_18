import React, { Component } from 'react';
import './Footer.css';

const logo_img_src = "/Portfolio_1.svg";

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: ""
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
      case String(this.state.path.match(/.*illustration.+/)):
        return (
          <div className="footer-container footer-black">
            <span className="footer-content">© 2019 ZUYUAN FAN. ALL RIGHTS RESERVED.</span>
          </div>
        );
      default:
        return (
          <div className="footer-container footer-white">
            <span className="footer-content">© 2019 ZUYUAN FAN. ALL RIGHTS RESERVED.</span>
          </div>
        );
    }
  }
}

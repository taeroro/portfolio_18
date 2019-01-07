import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './Illustration.css';

import { illustration_work_data } from '../IllustrationWorkData';
const back_bt_img_src = "/buttons/back_button.svg"

class Illustration extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderCornerLines() {
    return (
      <div className="illustration-corner-lines">
        <div className="corner-line-tl"></div>
        <div className="corner-line-tr"></div>
      </div>
    );
  }

  render() {
    return (
      <div className="illustration-main-container">
        <div className="illustration-header-container">
          {this.renderCornerLines()}

          <h1>02 WORK - ILLUSTRATION</h1>

          <Link className="illustration-back-link" to={"/"}>
            <div className="illustration-back-bt-container">
              <img className="back-bt-icon" src={back_bt_img_src} alt="back" />
              <span>BACK</span>
            </div>
          </Link>
        </div>

        <div className="illustration-list-container">
          <div className="row">
            {illustration_work_data.map((item) => {
              return (
                <div className="col-lg-4" key={item.id}>
                  <Link className="illustration-single-link" to={"/work/illustration/" + item.id}>
                    <div className="illustration-single-container">
                      {
                        item.content
                        ? (
                          <div>
                            <div className="illustration-thumbnail-overlay">
                              <span className="illustration-thumbnail-name">{item.name}</span>
                            </div>
                            <div className="illustration-img-wrapper">
                              <img src={item.content} className="illustration-thumbnail-img" />
                            </div>
                          </div>
                        )
                        : <div></div>
                      }
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(Illustration);

import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './Digital.css';

import { digital_work_data } from '../DigitalWorkData';
const back_bt_img_src = "/buttons/back_button.svg"


class Digital extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderCornerLines() {
    return (
      <div className="digital-corner-lines">
        <div className="corner-line-tl"></div>
        <div className="corner-line-tr"></div>
      </div>
    );
  }

  render() {
    return (
      <div className="digital-main-container">
        <div className="digital-header-container">
          {this.renderCornerLines()}

          <h1>02 WORK - DIGITAL</h1>

          <Link className="digital-back-link" to={"/"}>
            <div className="digital-back-bt-container">
              <img className="back-bt-icon" src={back_bt_img_src} alt="back" />
              <span>BACK</span>
            </div>
          </Link>
        </div>

        <div className="digital-list-container">
          <div className="row">
            {digital_work_data.map((item) => {
              return (
                <div className="col-lg-4" key={item.id}>
                  <Link className="digital-single-link" to={"/work/digital/" + item.id}>
                    <div className="digital-single-container">
                      {
                        item.thumbnail
                        ? (
                          <div>
                            <div className="digital-thumbnail-overlay">
                              <span className="digital-thumbnail-name">{item.name}</span>
                            </div>
                            <img src={item.thumbnail} className="digital-thumbnail-img" />
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

export default withRouter(Digital);

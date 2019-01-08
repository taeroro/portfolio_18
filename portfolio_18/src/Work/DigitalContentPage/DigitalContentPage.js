import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './DigitalContentPage.css';

import { digital_work_data } from '../DigitalWorkData';
const back_bt_img_src = "/buttons/back_button.svg"

class DigitalContentPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let artwork_object = digital_work_data.find((element) => {
      return element.id == this.props.match.params.id;
    });
    let i = 0;

    // Special ones need a link
    if (artwork_object.id !== 6) {
      return (
        <div>
          <div className="content-header-container">
            <Link className="header1-back-link" to={"/work/digital"}>
              <div className="header1-back-bt-container">
                <img className="header1-bt-icon unselectable" src={back_bt_img_src} alt="back" />
                <span className="header1-bt-name unselectable">BACK</span>
              </div>
            </Link>
          </div>

          <div className="digital-art-container">
            {
              artwork_object.content
              ? (artwork_object.content.map((item) => {
                if (i === 3) {
                  return (
                    <div className="digital-special-container" key={i}>
                      <div className="digital-link-container">
                        {
                          artwork_object.id === 1
                          ? <a href="https://www.anvilstartups.com/">https://www.anvilstartups.com</a>
                          :
                          artwork_object.id === 2
                          ? <iframe src="https://player.vimeo.com/video/309805012?title=0&amp;byline=0&amp;portrait=0" width="320" height="695" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                          :
                          artwork_object.id === 3
                          ? <a href="http://www.yintechlabs.com/">http://www.yintechlabs.com</a>
                          :
                          artwork_object.id === 4
                          ? <iframe src="https://player.vimeo.com/video/309807419?title=0&amp;byline=0&amp;portrait=0" width="100%" height="500" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                          :
                          artwork_object.id === 5
                          ? <a href="https://invis.io/ZFPUDK92MVR">https://invis.io/ZFPUDK92MVR</a>
                          : <div></div>
                        }
                      </div>
                      <img src={item} className="digital-art-img-special" key={i++} />
                    </div>
                  )
                }
                else return <img src={item} className="digital-art-img" key={i++} />;
              }))
              : <div></div>
            }
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="content-header-container">
          <Link className="header1-back-link" to={"/work/digital"}>
            <div className="header1-back-bt-container">
              <img className="header1-bt-icon" src={back_bt_img_src} alt="back" />
              <span className="header1-bt-name">BACK</span>
            </div>
          </Link>
        </div>

        <div className="digital-art-container">
          {
            artwork_object.content
            ? (artwork_object.content.map((item) => {
              return <img src={item} className="digital-art-img" key={i++} />;
            }))
            : <div></div>
          }
        </div>
      </div>
    );
  }
}



export default withRouter(DigitalContentPage);

import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './IllustrationContentPage.css';

import { illustration_work_data } from '../IllustrationWorkData';
const back_bt_img_src = "/buttons/back_button.svg"

class IllustrationContentPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let artwork_object = illustration_work_data.find((element) => {
      return element.id == this.props.match.params.id;
    });
    let i = 0;

    return (
      <div>
        <div className="content-header-container">
          <Link className="header-back-link" to={"/work/illustration"}>
            <div className="header-back-bt-container">
              <img className="header-bt-icon unselectable" src={back_bt_img_src} alt="back" />
              <span className="header-bt-name unselectable">BACK</span>
            </div>
          </Link>
        </div>

        <div className="illustration-art-container">
          <div className="row">
            <div className="col-lg-9">
              {
                artwork_object.content
                ? (<div className="illustration-wrapper" style={{
                  "backgroundImage": `url(${artwork_object.content})`
                }}>
                    {/* <img src={artwork_object.content} className="illustration-art-img" key={i++} /> */}
                  </div>)
                : <div></div>
              }
            </div>
            <div className="col-lg-3">
              {
                artwork_object.name
                ? <h1 className="illustration-name">{artwork_object.name}</h1>
                : <div></div>
              }
              {
                artwork_object.year
                ? <h2 className="illustration-content">{artwork_object.year}</h2>
                : <div></div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(IllustrationContentPage);

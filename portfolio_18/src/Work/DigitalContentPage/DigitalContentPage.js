import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './DigitalContentPage.css';

import { digital_work_data } from '../DigitalWorkData';

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

    return (
      <div className="digital-art-container">
        {
          artwork_object.content
          ? (artwork_object.content.map((item) => {
            return <img src={item} className="digital-art-img" key={i++} />;
          }))
          : <div></div>
        }
      </div>
    );
  }
}



export default withRouter(DigitalContentPage);

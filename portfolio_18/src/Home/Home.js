import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import smoothscroll from 'smoothscroll-polyfill';
import { Link, withRouter } from "react-router-dom";
import { isMobile, isFirefox } from 'react-device-detect';
import Modal from 'react-modal';
import './Home.css';

const diag_line_src = "/arts/diagonal_line.svg";
const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '80vw',
    // height: '50vh',
    padding: '12% 10%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '0',
    border: 'none',
  }
};
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.4)';
Modal.defaultStyles.overlay.zIndex = '20';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowHeight: window.innerHeight,
      prevY: 0,
      pageNum: 1,
      modalIsOpen: false
    };

    this.scrolling = false;

    this.myRef1 = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef3 = React.createRef();

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
    this.preventDefaultForScrollKeys = this.preventDefaultForScrollKeys.bind(this);
    this.disableScroll = this.disableScroll.bind(this);
    this.enableScroll = this.enableScroll.bind(this);
    this.wheelEvent = this.wheelEvent.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.debounceWheelEvent = debounce(this.wheelEvent, 34, {
      'leading': true,
      'trailing': false
    });
  }

  componentDidMount() {
    this.state.pageNum = this.getInitPageNum();
    this.disableScroll();
    this.updateWindowDimensions();

    smoothscroll.polyfill();

    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('wheel', this.debounceWheelEvent);

    if (isMobile || isFirefox) this.openModal();
  }

  componentWillUnmount() {
    this.enableScroll();
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('wheel', this.debounceWheelEvent);
  }

  updateWindowDimensions() {
    this.setState({ windowHeight: window.innerHeight });
  }

  getInitPageNum() {
    if (window.scrollY < this.state.windowHeight) {
      this.setState({ pageNum: 1 });
    }
    else if (this.state.windowHeight <= window.scrollY && window.scrollY < 2 * this.state.windowHeight) {
      this.setState({ pageNum: 2 });
    }
    else if (2 * this.state.windowHeight <= window.scrollY && window.scrollY < 3 * this.state.windowHeight) {
      this.setState({ pageNum: 3 });
    }
  }

  wheelEvent(event) {
    // Scrolling down
    if (!this.scrolling && event.deltaY > 0) {
      if (window.scrollY < this.state.windowHeight) {
        this.scrolling = true;
        window.scrollTo({
            top: this.myRef2.current.offsetTop,
            behavior: "smooth"
        });
        this.setState({ pageNum: 2 });
        this.scrolling = false;
      }
      else if (this.state.windowHeight <= window.scrollY && window.scrollY < 2 * this.state.windowHeight) {
        this.scrolling = true;
        window.scrollTo({
            top: this.myRef3.current.offsetTop,
            behavior: "smooth"
        });
        this.setState({ pageNum: 3 });
        this.scrolling = false;
      }
    }
    // Scrolling up
    else if (!this.scrolling && event.deltaY < 0) {
      if (this.state.windowHeight <= window.scrollY && window.scrollY < 2 * this.state.windowHeight) {
        this.scrolling = true;
        window.scrollTo({
            top: this.myRef1.current.offsetTop,
            behavior: "smooth"
        });
        this.setState({ pageNum: 1 });
        this.scrolling = false;
      }
      else if (2 * this.state.windowHeight <= window.scrollY && window.scrollY < 3 * this.state.windowHeight) {
        this.scrolling = true;
        window.scrollTo({
            top: this.myRef2.current.offsetTop,
            behavior: "smooth"
        });
        this.setState({ pageNum: 2 });
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

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  renderCornerLines() {
    return (
      <div className="home-corner-lines unselectable">
        <div className="corner-line-tl"></div>
        <div className="corner-line-tr"></div>
        <div className="corner-line-br"></div>
        <div className="corner-line-bl"></div>
      </div>
    );
  }

  renderLabelNumber() {
    switch (this.state.pageNum) {
      case 1:
        return <div className="side-label-text unselectable">01 ABOUT</div>;
      case 2:
        return <div className="side-label-text unselectable">02 WORK</div>;
      case 3:
        return <div className="side-label-text unselectable">03 CONTACT</div>;
    }
  }

  renderSideLabel() {
    return (
      <div className="home-side-label-container">
        {this.renderLabelNumber()}
        <div className="side-label-line"></div>
      </div>
    );
  }

  renderShapes() {
    const left_shapes_img_src = "/arts/left_shapes.svg";
    const right_shapes_img_src = "/arts/right_shapes.svg";

    // TODO: change the position using media query
    if (this.state.pageNum === 1)
      return (
        <div className="home-random-shapes unselectable">
          <div className="shapes-left-container">
            <img className="left-shapes" src={left_shapes_img_src} alt="l" />
          </div>
          <div className="shapes-right-container">
            <img className="right-shapes" src={right_shapes_img_src} alt="r" />
          </div>
        </div>
      );
  }

  renderAbout() {
    return (
      <div className="home-container about-container" ref={this.myRef1}>
        {this.renderShapes()}

        <div className="about-animation-container">
          <img className="diagonal-line-left unselectable" src={diag_line_src} alt="l" />

          <div className="about-text-container">
            <h1>HI,</h1>
            <h1>I'M RYAN FAN,</h1>
            <h1>A DESIGNER / SW ENGINEER.</h1>
            <h1>FOCUSING ON UI / UX DESIGN.</h1>
          </div>

          <img className="diagonal-line-right unselectable" src={diag_line_src} alt="r" />
        </div>
      </div>
    );
  }

  renderWork() {
    // TODO: change the postition of MYWORKS using media query

    return (
      <div className="home-container work-container" ref={this.myRef2}>
        <div className="work-animation-container">
          <img className="work-diagonal-line-left unselectable" src={diag_line_src} alt="l" />

          <div className="work-content-container">
            <div className="work-heading-container">
              <h1>MY WORKS:</h1>
            </div>

            <div className="work-options-container unselectable">
              <Link className="work-digital-link" to={"/work/digital"}>
                <div className="work-digital-container">
                  <h1 className="work-first-letter">D</h1>
                  <h1 className="work-letters">IGITA</h1>
                  <h1 className="work-last-letter">L</h1>
                </div>
              </Link>

              <div className="work-options-divide-line unselectable"></div>

              <Link className="work-illustration-link" to={"/work/illustration"}>
                <div className="work-illustration-container">
                  <h1 className="work-first-letter">I</h1>
                  <h1 className="work-letters">LLUSTRATIO</h1>
                  <h1 className="work-last-letter">N</h1>
                </div>
              </Link>
            </div>
          </div>

          <img className="work-diagonal-line-right unselectable" src={diag_line_src} alt="r" />
        </div>
      </div>
    );
  }

  renderContact() {
    // TODO: change this link to the one on S3
    const portrait_img_src = "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/31171271_1674203579339998_8769581829122145631_n.jpg?_nc_cat=104&_nc_ht=scontent-ort2-1.xx&oh=21bc82da5cfcf0f779eb890cf0b910a6&oe=5C6F2163";
    const linkedin_img_src = "/linkIcons/icons8-linkedin.png";
    const behance_img_src = "/linkIcons/icons8-behance.png";
    const dribbble_img_src = "/linkIcons/icons8-dribbble.png";
    const instagram_img_src = "/linkIcons/icons8-instagram_new.png";
    const github_img_src = "/linkIcons/icons8-github.png";


    return (
      <div className="home-container contact-container" ref={this.myRef3}>
        <div className="contact-bio-container">
          <div className="portrait-container">
            <img className="portrait-img unselectable" src={portrait_img_src} alt="portrait" />
          </div>

          <div className="contact-info-container">
            <h1>RYAN FAN</h1>
            <div className="contact-email-container">
              <h2>EMAIL: </h2>
              <a href="mailto:ryanfan1996@gmail.com">ryanfan1996@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="contact-links-container unselectable">
          <a href="https://www.linkedin.com/in/zuyuanfan/">
            <img className="icons-img" src={linkedin_img_src} alt="linkedin" />
          </a>
          <a href="https://www.behance.net/ryanfandesign">
            <img className="icons-img" src={behance_img_src} alt="behance" />
          </a>
          <a href="https://dribbble.com/ryantf11">
            <img className="icons-img" src={dribbble_img_src} alt="dribbble" />
          </a>
          <a href="https://www.instagram.com/ryantf11/">
            <img className="icons-img" src={instagram_img_src} alt="instagram" />
          </a>
          <a href="https://github.com/taeroro">
            <img className="icons-img last-icon" src={github_img_src} alt="github" />
          </a>
        </div>
      </div>
    );
  }

  renderModal() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
      >
        <h1 className="modal-message">For the best experience, please visit this website using browsers other than Firefox on a desktop or laptop.</h1>
        <h1 className="modal-message">Sorry for the inconvenience.</h1>
        <div className="modal-bt-wrapper">
          <button className="modal-close-bt" onClick={this.closeModal}>OK</button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div className="home-main-container">
        {this.renderModal()}
        {this.renderCornerLines()}
        {this.renderSideLabel()}

        {this.renderAbout()}
        {this.renderWork()}
        {this.renderContact()}
      </div>
    );
  }
}

export default withRouter(Home);

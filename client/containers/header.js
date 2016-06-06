import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Glyphicon, glyph } from 'react-bootstrap'

import { sideBarToggle } from '../actions/index';


export default class Header extends Component {
  constructor(props) {
    super(props);

    asideToggle = asideToggle.bind(this);
  }
  render() {
    let hideHeader;
    //hiding the regular header for all pages other than home page and first-launch
    if (this.props.url !== '/' && this.props.url !== '/first-launch') {
      hideHeader = ClassNames({hideHeader: true});
    } else {
      hideHeader = ClassNames({hideHeader: false});
    }

    let hideHamburger;
    //hiding the hamburger menu if it's home page for first-launch
    if (this.props.url === '/' || this.props.url === '/first-launch') {
      hideHamburger = ClassNames({hideHamburger: true});
    } else {
      hideHamburger = ClassNames({hideHamburger: false});
    }

    return (
      <div>
        <header className={"header " + hideHeader}>
         <a href="#" onClick={asideToggle} className={hideHamburger}><Glyphicon glyph="menu-hamburger" /></a>
        { (this.props.url === '/' && window.innerWidth < 769) ? <div></div> : <div className="small-logo"></div>}
        </header>
      </div>

    );
  }

}

function asideToggle(e) {
  e.preventDefault();
  console.log("toggling!")
  this.props.sideBarToggle();

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sideBarToggle }, dispatch);
}

function mapStateToProps(state) {
  // console.log('state: ', state)
  // test to get current path

  return {
    url: state.routing.locationBeforeTransitions.pathname
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(Header);

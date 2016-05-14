import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import {sshConsole} from '../actions/index';
import Iframe from 'react-iframe';

export default class liveConsole extends Component {
  constructor(props){
    super(props);
    this.getConsole = this.getConsole.bind(this);
    this.state = {
      url: '',
    }
  }

  getConsole() {
    console.log('getconsole working')
    this.props.sshConsole();
  }

   componentWillReceiveProps(nextProps) {
    const view = nextProps.consoleUrl;
    console.log('i mounted:', view.url);
    this.setState({url: view.url});
    
  }

  render() {
    return (
      <div className="row row-centered">
        <div className="login col-md-4 col-centered">
          <h4>Live Console</h4>
          <p>Do you want to ssh to your instance from within a web browser?</p>
          <Button onClick={this.getConsole}>Yeah! Give me a console!</Button>
          <div>
          <Iframe style={{position:'relative'}} url={this.state.url} />
          </div>

        </div>
      </div>  
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {sshConsole}), dispatch);
}

function mapStateToProps(state) {
  console.log('state: ', state.reducers.liveConsole.console)

 return {
  consoleUrl: state.reducers.liveConsole.console,
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(liveConsole);
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';

class Deploy extends Component {
constructor(props){
    super(props);
    console.log('props in deploy constructor:' ,this.props);
  }

  handleClick (id) {
     this.props.setRepoID(id);
     window.localStorage.setItem('repoID', id);
     //console.log('click excecuted, this is the id', this.SelectedRepo)
     this.props.createInst(); 
    };

  render() {
    console.log('props in deploy',this.props)
    var boundClick = this.handleClick.bind(this);
    var repoID = this.props.id;
    return (
      // <form id='deployForm' onSubmit={() => deploy(this.props.createInst, this.props.reInstall)}>
      //   <input required className="deployFrm" 
      //     type="text" 
      //     value = {this.state.instName}
      //     onChange = {
      //        event => this.setState({
      //        instName: event.target.value
      //      })
      //    }
      //    /> <div onClick={() => this.props.createInst()}><button className="btn btn-primary deployBtn">Deploy</button></div>
      // <Link to="/loading" onClick={() => this.props.createInst()}><button className="btn btn-primary deployBtn">Deploy</button></Link> 
       <Link to="/loading" onClick={()=>boundClick(repoID)}><button className="btn btn-primary deployBtn">Deploy</button></Link> 
      
    //  <button form='deployForm' value="Submit" className="btn btn-primary deployBtn">Deploy</button>
    // </form>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({createInst,setRepoID}, dispatch);
}

function mapStateToProps(state) {
  //console.log('instance state: ', state.reducers.instance)
  return {
    Install: state.reducers.install
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Deploy);
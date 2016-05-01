import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';

class Deploy extends Component {
constructor(props){
    super(props);
  }

 handleClick (id) {
     this.props.setRepoID(id);
    // window.localStorage.setItem('repoID', id);
     //console.log('click excecuted, this is the id', this.SelectedRepo)
     this.props.createInst(); 
    };

  render() {
    var boundClick = this.handleClick.bind(this);
    var repoID = this.props.id;

    return (
      <div>  
         <Link to="/loading" onClick={()=>boundClick(repoID)}><button className="btn btn-primary deployBtn">Deploy</button></Link> 
      </div>
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
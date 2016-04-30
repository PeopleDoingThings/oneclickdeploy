import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';

class Deploy extends Component {
constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {envVar: {}}
  }

   onInputChange(event) {
    this.setState({ envVar: event.target.value });
  }

   onFormSubmit(event) {
    event.preventDefault();
    this.setState({envVar: ''}); 
    console.log('this is the input:', this.state.envVar )  
  }

  handleClick (id) {
     this.props.setRepoID(id);
      window.localStorage.setItem('repoID', id);
     //console.log('click excecuted, this is the id', this.SelectedRepo)
     this.props.createInst(); 
    };

  render() {
    var boundClick = this.handleClick.bind(this);
    var repoID = this.props.id;

    return (
      <form id={repoID} onSubmit={this.onFormSubmit} className="input-group">
        <input 
          className="deployFrm" 
          type="text" 
          value = {this.state.envVar}
          onChange = {this.onInputChange}
         />
        <button form={repoID} type='submit' className="btn btn-secondary">Submit</button>
         {
          // <div onClick={() => console.log('this is the form')}><button className="btn btn-primary deployBtn">Deploy</button></div>
      
      // <Link to="/loading" onClick={() => this.props.createInst()}><button className="btn btn-primary deployBtn">Deploy</button></Link> 
       // <Link to="/loading" onClick={()=>boundClick(repoID)}><button className="btn btn-primary deployBtn">Deploy</button></Link> 
      
    // <button form='deployForm' value="Submit" className="btn btn-primary deployBtn">Deploy</button>
        //<Link to="/loading" onClick={()=>boundClick(repoID)}><button className="btn btn-primary deployBtn">Deploy</button></Link> 
  }
    </form>

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
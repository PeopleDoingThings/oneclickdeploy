import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import { Modal, Button } from 'react-bootstrap'

class Deploy extends Component {
constructor(props){
    super(props);
    //this.state = {showModal: false};
    // this.closeModal = this.closeModal.bind(this);
    // this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
}
 // closeModal(){
 //  console.log('this here', this)
 //  this.setState({showModal:false});
 // }

 // openModal(){
 //  console.log('this here', this)


 //  this.setState({showModal:true});
 // }

 handleClick (id) {
     //this.props.setRepoID(id);
     console.log('the create instance would work with id', id)
    // this.openModal();
    window.localStorage.setItem('repoID', id);
    //  console.log('click excecuted, this is the id', id)
    this.props.createInst();
    };


render() {
    var boundClick = this.handleClick.bind(this);
    var repoID = this.props.id;
    var repoName = this.props.repoName;
  return (
      <div>
      {
      //   <Button
      //     bsStyle="primary"
      //     bsSize="large"
      //     onClick={this.openModal}
      //     >Deploy
      // </Button>
      // <Modal show={this.state.showModal} onHide={this.closeModal}>
      //     <Modal.Header closeButton>
      //       <Modal.Title>Please confirm</Modal.Title>
      //     </Modal.Header>
      //     <Modal.Body>
      //       <b>Are you sure you would like to deploy your 
      //       {repoName} 
      //       repo?</b>
      //     </Modal.Body>
      //       <Modal.Footer>
      //         <Button onClick={this.closeModal}>Cancel</Button>
              }
              <Link to="/loading"><button className="btn btn-primary deployBtn" onClick={()=>boundClick(repoID)} form="envForm" type="submit">Let's do it!</button></Link>
             {
      //        </Modal.Footer>
      // </Modal>
    }
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
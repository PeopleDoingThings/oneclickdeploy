import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RepoItem from '../components/repo_list_item';
import { PanelGroup, Panel } from 'react-bootstrap';
import Form from './envVarForm';
import { getEnvVar} from '../actions/index';


class Deployable extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showForm: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

handleClick (repoID){
    this.props.getEnvVar(repoID);
    this.setState({showForm: true});
}

hideForm (){
    this.setState({showForm: false});
}


renderList() {
    if (this.props.repos.length === 0 || this.props.repos === undefined || this.props.repos[0].length === 0){
      return "Loading....."
    } else {
      var counter = 0;
      return (this.props.repos.map((repo) => {
        if(repo.deployed===false)
        return (
            <Panel key={repo.repoid} header={repo.name} id={repo.repoid} eventKey={counter++}>
              {!this.state.showForm ?
                <div>
                <RepoItem repoItem={repo} />
                <button className="btn btn-primary deployBtn" onClick={()=>this.handleClick(repo.repoid)}>Get Started!</button>
                 </div>
                : null}

                 { this.state.showForm ?
                   <div>
                   <Form key={repo._id} id={repo.repoid}/>
                 <button className="btn btn-primary" onClick={()=>this.hideForm()}>Cancel</button>
                  </div>
                 : null }

            </Panel>
          )
        })
      );
    }
  }

  render() {
    return (
      <div>
        <PanelGroup accordion>
          {this.renderList()}
        </PanelGroup>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEnvVar }, dispatch);
}

function mapStateToProps(state) {
  console.log('state: ', state)
  return {
    repos: state.reducers.repos
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Deployable);

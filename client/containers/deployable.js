import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RepoItem from '../components/repo_list_item';
import { Glyphicon, glyph, PanelGroup, Panel } from 'react-bootstrap';
import Form from './envVarForm';
import { getEnvVar, refreshRepo} from '../actions/index';


class Deployable extends Component {
  constructor(props) {
    super(props);
    this.state ={
      showForm: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.refreshBtn = this.refreshBtn.bind(this);
  }

handleClick (repoID){
    this.props.getEnvVar(repoID);
    this.setState({showForm: true});
    console.log('handleclick for form')
}

refreshBtn(){
    this.props.refreshRepo();
}

hideForm (){
    this.setState({showForm: false});
}

renderList() {
    if (this.props.repos.length === 0 || this.props.repos === undefined || this.props.repos[0].length === 0){
      return "Loading....."
    } else {
      var counter = 0;
      var now= Date.now();
      var old = Date.parse(this.props.repos[0].age);
     if(Math.abs(now - old ) > (259200000))
     {this.props.refreshRepo()}
      return (this.props.repos.map((repo) => {
        if(repo.deployed===false)
        return (
            <Panel 
            key={repo.repoid} 
            header={repo.name} 
            id={repo.repoid} 
            repoName={repo.name} 
            eventKey={counter++} 
            className="repo-item"
            onEnter={()=>{this.props.getEnvVar(repo.repoid); this.setState({showForm: false})}}
            >
              {!this.state.showForm ?
                <div>
                <RepoItem repoItem={repo} />
                <button className="btn btn-primary deployBtn" onClick={()=>this.handleClick(repo.repoid)}>Get Started!</button>
                 </div>
                : null}
                 { this.state.showForm ?
                   <div>
                    <h4>First, does the app have any environment variable?</h4>
                    <Form key={repo._id} id={repo.repoid}/>
                 <button className="cancel btn" onClick={()=>this.hideForm()}>Cancel</button>
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
        <PanelGroup accordion className="repo-list">
         {this.renderList()}   
        </PanelGroup>
            {''}
            {''}
            {''}
          <div className="refresh-button">  
            <h4>Can't find your new repos here?</h4> 
            <button onClick={()=>this.refreshBtn()}>Fetch My GitHub Repos</button>
          </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEnvVar, refreshRepo }, dispatch);
}

function mapStateToProps(state) {
  return {
    repos: state.reducers.repos,
    envVars: state.reducers.envVar
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Deployable);
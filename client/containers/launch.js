import React, {Component} from 'react';
import RepoList from './repo_list';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isAuth } from '../actions/index';

class Launch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false
    }
    this.authCheck = this.authCheck.bind(this);
  }

  authCheck (status) {
    if(status === 'Unauthorized') {
      window.location.href = ('/');
    } else {
      this.setState({showContent: true});

    }
  }

  componentWillMount() {
    this.props.isAuth();
  }

  componentWillReceiveProps(nextProps) {
    const auth = nextProps.Auth;
    this.authCheck(auth);
  }

  render() {
    if (this.state.showContent === true) {
      return (
        <div className="first-launch">
          <div className="launch-title">
            <h1>Pick an app</h1>
            <h3>Deployment is as easy as picking an app from the deployable list below</h3>
            <p>We've already gone through your public github repos and listed the ones that are deployable trhough our app. So just sit back and pick the one you want to deploy</p>
          </div>
          <RepoList />
        </div>
      );
    } else {
      return <h2>loading</h2>
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ isAuth }, dispatch);
}

function mapStateToProps(state) {
  // console.log('isAuth state: ', state.reducers.auth)

  return {
    Auth: state.reducers.auth
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(Launch);
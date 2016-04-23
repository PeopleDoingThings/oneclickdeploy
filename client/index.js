import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reduxPromise from 'redux-promise'

import reducers from './reducers/index'
import App from './components/app';
import MainBoard from './components/main_board';
import DashBoard from './containers/dashBoard';
import Login from './components/login';

import RepoList from './containers/repo_list';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// ReactDOM.render(
//   <provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </provider>
//   , document.querySelect('.container')
// );

// Add the reducer to your store on the `routing` key
const store = createStoreWithMiddleware(
  combineReducers({
    reducers,
    routing: routerReducer
  })
)
console.log('store:',store.getState())

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
   <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <div>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="main-panel" component={MainBoard}>
          <Route path="/repos" component={RepoList} />
          <Route path="/dashboard" component={DashBoard} />
        </Route>
      </Route>
    </Router>
    </div>
   </Provider>
  , document.getElementById('mount'));

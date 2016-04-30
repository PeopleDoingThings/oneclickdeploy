import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import ReduxPromise from 'redux-promise'

import reducers from './reducers/index'
import App from './components/app';
import MainBoard from './components/main_board';
import DashBoard from './containers/dashBoard';
import Login from './components/login';
import Loading from './containers/loadingInstance';

import RepoList from './containers/repo_list';

const reducer = combineReducers({reducers,routing: routerReducer})
const store = createStore(reducer, applyMiddleware(ReduxPromise))
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const history = syncHistoryWithStore(appHistory, store)

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
          <Route path="/loading" component={Loading} />
        </Route>
      </Route>
    </Router>
    </div>
   </Provider>
  , document.getElementById('mount'));

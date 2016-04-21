import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers'


import App from './components/app';
import MainBoard from './components/mainBoard';
import DashBoard from './components/dashBoard';
// import reducers from './reducers';

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
   <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <div>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="dashboard" component={DashBoard} />
        
      </Route>
    </Router>
    </div>
   </Provider>
  , document.getElementById('mount'));

// <Route path="/" component={App}>
//         <Route path="dashboard" component={MainBoard} />
// </Route>

// <Route path="/" component={App} />
//       <Route component={MainBoard}>
//         <Route path="dashboard" component={DashBoard} />
//       </Route> 
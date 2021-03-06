import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {Route} from 'react-router-dom';

import { ConnectedRouter, /*routerReducer,*/ routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

import Header from './components/page/Header';
import Welcome from './components/welcome/Welcome';
import UserNotificationBar from './components/notification/UserNotificationBar';
import LogWorkout from './components/log-workout/LogWorkout';
import Loader from './components/page/Loader';

import App from './App';

const history = createHistory();
const mockStore = configureStore();
const initialState = {
  user: {
    data: {
      authToken: null,
      exerciseNames: []
    }
  }
};

it('renders without crashing', () => {
  if (typeof document !== 'undefined') {
    const store = mockStore(initialState);
    const div = document.createElement('div');

    ReactDOM.render(<Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            {/* Need to somehow setup the reducer for these to work */}
            {/*<Loader/>*/}
            <Header/>
            {/*<UserNotificationBar/>*/}
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/log-workout" component={LogWorkout}/>
          </div>
        </ConnectedRouter>
      </Provider>, div);
  }
});

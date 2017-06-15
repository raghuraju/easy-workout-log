import { expect } from 'chai';

import appReducer from './appReducer';
import {initialState as signupInitialState} from './signup/signupReducer';
import {initialState as loginInitialState} from './login/loginReducer';
import {initialState as globalInitialState} from './global/globalReducer';
import {initialState as userDataInitialState} from './user-data/userDataReducer';

describe('appReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = appReducer(undefined, { type: '' });

    // then
    expect(newState).to.deep.equal({ 
      user: { 
        logWorkout: {},
        data: userDataInitialState
      }, 
      signup: signupInitialState,
      login: loginInitialState,
      global: globalInitialState,
    });
  })
});

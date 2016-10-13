import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import countReducer from './countReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  count: countReducer
})

export default rootReducer;

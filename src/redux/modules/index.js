import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import postReducer from './post/postReducer';

const reducers = combineReducers({
  auth: authReducer,
  post: postReducer,
})

export default reducers

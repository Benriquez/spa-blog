import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_ERROR
} from './authTypes'

const INITIAL_STATE = {
  token: null,
  values: {},
  register: false,
  error: null,
}

const authReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case AUTH_REGISTER :
      return {
        ...state,
        values: action.payload,
      }
    case AUTH_LOGIN :
      //localStorage.setItem('token', action.payload)
      return {
        ...state,
      }
    case `${AUTH_REGISTER}_SUCCESS` :
      return {
        ...state,
        values: action.payload.data,
        register: true,
        error: null,
      }
    case `${AUTH_LOGIN}_SUCCESS` :
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        token: action.payload,
        register: false,
        error: null,
      }
    case `${AUTH_REGISTER}_FAIL` :
      return {
        ...state,
        register: false,
        error: action.payload,
      }
    case `${AUTH_LOGIN}_FAIL` :
      return {
        ...state,
        error: action.payload,
      }
    case `${AUTH_ERROR}` :
      return {
        ...state,
        token: null,
        error: null,
      }
    default:
      return state;
  }
}

export default authReducer

import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_ERROR
} from './authTypes'

export function authRegister(data) {
  return {
    type: AUTH_REGISTER,
    payload: data
  };
}

export function authLogin(data) {
  return {
    type: AUTH_LOGIN,
    payload: data
  };
}

export function authError(data) {
  return {
    type: AUTH_ERROR,
    payload: data
  };
}

import { put, call, getContext } from 'redux-saga/effects';
import { queries } from './authQueries';

import { AUTH_LOGIN, AUTH_REGISTER } from './authTypes';

function* authRegisterReq({ email, password }) {
  const client = yield getContext('client');
  const mutation = queries.REGISTER;

  return yield call(client.mutate, { mutation,
    variables: { email, password }
  });
}

export function* authRegister(action) {
  try {
    const { data: { register } } = yield authRegisterReq(action.payload);
    yield put({ type: `${AUTH_REGISTER}_SUCCESS`, payload: register })

  } catch(error) {
    yield put({ type: `${AUTH_REGISTER}_FAIL`, payload: error })
  }
}

function* authLoginReq({ email, password }) {
  const client = yield getContext('client');
  const mutation = queries.LOGIN;

  return yield call(client.mutate, { mutation,
    variables: { email, password }
  });
}

export function* authLogin(action) {
  try {
    const { data: { authenticate } } = yield authLoginReq(action.payload);
    yield put({ type: `${AUTH_LOGIN}_SUCCESS`, payload: authenticate })
  } catch(error) {
    yield put({ type: `${AUTH_LOGIN}_FAIL`, payload: error })
  }
}

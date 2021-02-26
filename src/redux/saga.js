import { all, fork, takeLatest, setContext } from 'redux-saga/effects';
import { client } from './../utils/apollo';

import {
  AUTH_LOGIN,
  AUTH_REGISTER
} from './modules/auth/authTypes';

import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  ADD_COMMENT
} from './modules/post/postTypes';

import { authLogin, authRegister } from './modules/auth/authSaga';
import { getPosts, getPost, addPost, updatePost, addComment } from './modules/post/postSaga';

export function* authRegisterSaga() {
  yield takeLatest(AUTH_REGISTER, authRegister)
}

export function* authLoginSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
}

export function* getPostsSaga() {
  yield takeLatest(GET_POSTS, getPosts)
}

export function* getPostSaga() {
  yield takeLatest(GET_POST, getPost)
}

export function* addPostSaga() {
  yield takeLatest(ADD_POST, addPost)
}

export function* updatePostSaga() {
  yield takeLatest(UPDATE_POST, updatePost)
}

export function* addCommentSaga() {
  yield takeLatest(ADD_COMMENT, addComment)
}

export default function* rootSaga() {
  yield setContext({ client })
  yield all([
    fork(authRegisterSaga),
    fork(authLoginSaga),
    fork(getPostSaga),
    fork(addPostSaga),
    fork(updatePostSaga),
    fork(getPostsSaga),
    fork(addCommentSaga),
  ])
}

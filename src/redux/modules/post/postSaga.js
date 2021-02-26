import { put, call } from 'redux-saga/effects';
import { queries } from './postQueries';
import useQuery from './../../../hooks/useQuery';
import useMutation from './../../../hooks/useMutation';

import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  ADD_COMMENT,
} from './postTypes';

function* getPostsReq(data = {}) {
  return yield call(useQuery, queries.POSTS, data);
}

function* getPostReq(data = {}) {
  return yield call(useQuery, queries.POST, data);
}

function* addPostReq(data) {
  // const client = yield getContext('client');
  // const mutation = queries.ADD_POST;
  // return yield call(client.mutate, { mutation,
  //   variables: { ...data }
  // });
  return yield call(useMutation, queries.ADD_POST, data);
}

function* updatePostReq(data) {
  return yield call(useMutation, queries.UPDATE_POST, data);
}

function* addCommentReq(data = {}) {
  return yield call(useMutation, queries.ADD_COMMENT, data)
}

export function* getPosts(action) {
  try {
    let { data: { posts } } = yield call(getPostsReq, action.payload);
    yield put({ type: `${GET_POSTS}_SUCCESS`, payload: posts })
  } catch(error) {
    yield put({ type: `${GET_POSTS}_FAIL`, payload: error })
  }
}

export function* getPost(action) {
  try {
    let { data: { post } } = yield call(getPostReq, action.payload);
    yield put({ type: `${GET_POST}_SUCCESS`, payload: post })
  } catch(error) {
    yield put({ type: `${GET_POST}_FAIL`, payload: error })
  }
}

export function* addPost(action) {
  try {
    const { data: { post } } = yield addPostReq(action.payload)
    yield put({ type: `${ADD_POST}_SUCCESS`, payload: post })
  } catch(error) {
    yield put({ type: `${ADD_POST}_FAIL`, payload: error })
  }
}

export function* updatePost(action) {
  try {
    const { data: { post } } = yield updatePostReq(action.payload)
    yield put({ type: `${UPDATE_POST}_SUCCESS`, payload: post })
  } catch(error) {
    yield put({ type: `${UPDATE_POST}_FAIL`, payload: error })
  }
}

export function* addComment(action) {
  try {
    const { data: comment } = yield addCommentReq(action.payload)
    yield put({ type: `${ADD_COMMENT}_SUCCESS`, payload: comment })
  } catch(error) {
    yield put({ type: `${ADD_COMMENT}_FAIL`, payload: error })
  }
}

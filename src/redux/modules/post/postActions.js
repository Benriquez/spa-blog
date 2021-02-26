import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  GET_UPDATED_POST,
  ADD_COMMENT,
} from './postTypes'

export function getPosts(data) {
  return {
    type: GET_POSTS,
    payload: data
  };
}

export function getPost(data) {
  return {
    type: GET_POST,
    payload: data
  };
}

export function addPost(data) {
  return {
    type: ADD_POST,
    payload: data
  };
}

export function updatePost(data) {
  return {
    type: UPDATE_POST,
    payload: data
  };
}

export function getUpdatedPost(data) {
  return {
    type: GET_UPDATED_POST,
    payload: data
  };
}

export function addComment(data) {
  return {
    type: ADD_COMMENT,
    payload: data
  };
}

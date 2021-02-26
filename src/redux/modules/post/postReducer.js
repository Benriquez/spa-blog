import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  GET_UPDATED_POST,
  ADD_COMMENT,
} from './postTypes'

const INITIAL_STATE = {
  posts: [],
  post: {},
  postData: {},
  comment: {},
  processing: false,
  updating: false,
  error: null,
}

const postReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_POST:
    case ADD_POST:
    case UPDATE_POST:
    case ADD_COMMENT:
      return {
        ...state,
        error: null
      }
    case `${GET_UPDATED_POST}` :
      const postsData = state.posts.map(obj => obj.id === action.payload.id ? { ...obj, ...action.payload } : obj)

      return {
        ...state,
        posts: postsData,
        postData: action.payload,
        updating: true,
        error: null
      }
    case `${GET_POSTS}_SUCCESS` :
      let itemPost = {}, postsArr = []
      if(action.payload) {
        state.posts.map((item, key) => itemPost = item[key].id)
        postsArr = action.payload.map(obj => obj.id === itemPost ? { ...obj, ...state.posts } : obj)
      }

      return {
        ...state,
        posts: postsArr,
        error: null
      }
    case `${GET_POST}_SUCCESS` :
      return {
        ...state,
        post: action.payload,
        updating: true,
        error: null
      }
    case `${ADD_POST}_SUCCESS` :
      let filteredPosts = []
      if(action.payload) {
        let postKey = Object.keys(action.payload)[0];
        filteredPosts = [action.payload, ...state.posts.filter(item => Object.keys(item) !== postKey)]
      }
      return {
        ...state,
        post: action.payload,
        posts: filteredPosts,
        error: null
      }
    case `${UPDATE_POST}_SUCCESS` :
      return {
        ...state,
        error: null
      }
    case `${ADD_COMMENT}_SUCCESS` :
      let postsData2 = [];
      if(Object.keys(action.payload).length > 0) {
        if(action.payload.comment.postId === state.post.id) {
          postsData2 = [...state.posts.map(obj => {
            const postComments = {comments: [action.payload.comment,
              ...obj.comments.filter(item => Object.keys(item) !== action.payload.comment.id)]}
            return obj.id === state.post.id ? { ...obj, ...postComments } : obj
          })]
        }
      }

      return {
        ...state,
        posts: postsData2,
        comment: action.payload,
        updating: true,
        error: null
      }
    case `${GET_POSTS}_FAIL` :
    case `${GET_POST}_FAIL` :
    case `${ADD_POST}_FAIL` :
    case `${UPDATE_POST}_FAIL` :
    case `${ADD_COMMENT}_FAIL` :
      return {
        ...state,
        updating: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default postReducer

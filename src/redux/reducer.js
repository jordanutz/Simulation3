const initialState = {
  user: null,
  posts: []
}

const LOGGED_IN = 'LOGGED_IN',
      LOGGED_OUT = 'LOGGED_OUT',
      GET_POSTS = 'GET_POSTS'

export default function (state = initialState, action) {
  switch(action.type) {
    case LOGGED_IN:
      return {...state, user: action.payload}
    case LOGGED_OUT:
      return {...state, user: null}
    case GET_POSTS:
      return {...state, posts: action.payload}
    default:
      return {...state}
  }
}

export function logIn (user) {
  return {
    type: LOGGED_IN, payload: user
  }
}

export function logOut (user) {
  return {
    type: LOGGED_OUT
  }
}

export function getPosts (posts) {
  return {
    type: posts
  }
}

import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

// initilize state to empty string, pass in action
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;  
  }
}

// initialize state to empty array, pass in action
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default: 
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER reducer reached');
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  users
});

// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }

export default moviesApp;
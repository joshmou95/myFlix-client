// Action Types:
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';


// Actions:
// initialize the movies property
export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

// change the visibilityFilter property
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  console.log('SET_USER action triggered');
  return { type: SET_USER, value };
}
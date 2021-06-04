export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

// initialize the movies property
export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

// change the visibilityFilter property
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

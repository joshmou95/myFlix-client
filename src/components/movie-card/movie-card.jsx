import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render () {
    const { movie, onMovieClick } = this.props;
    return (
      <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}

// set static proptypes property on MovieCard
MovieCard.proptypes = {
  // must include movie object
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.number,
      Death: PropTypes.number
    }),
    Actors: PropTypes.array
  }).isRequired,
  // must contain onMovieClick and must be a function
  onMovieClick: PropTypes.func.isRequired
};

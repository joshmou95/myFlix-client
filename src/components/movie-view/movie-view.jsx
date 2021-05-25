import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-view.scss';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  render () {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view px-4">
        <div className="movie-poster p-4">
          <Card.Img variant="top" src={movie.ImagePath} />
        </div>
        <Card.Body>
          <span className="label">Title: </span>
          <Card.Title className="movie-title">
            <span className="value">{movie.Title}</span>
          </Card.Title>
          <span className="label">Description: </span>
          <Card.Text className="movie-description mb-3">
            <span className="value">{movie.Description}</span>
          </Card.Text>
          <Button onClick={() => { onBackClick(null); }}>Back</Button>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    Actors: PropTypes.array
  }),
  onBackClick: PropTypes.func.isRequired
};

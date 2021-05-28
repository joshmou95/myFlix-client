import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render () {
    const { movie } = this.props;

    return (
      <Card className="movie-card d-inline-flex m-1 p-2 w-100">
        <Card.Img className="w-100 h-50 poster" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="title h-auto w-100">{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="dark">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({ 
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};


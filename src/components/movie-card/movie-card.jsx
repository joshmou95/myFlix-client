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
      <div className="movie-card h-100 w-auto">
        <Card className="m-1 p-2">
          <Card.Img className="poster px-2 w-100 h-auto" variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="title h-auto w-100">{movie.Title}</Card.Title>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="dark">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
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


import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export class GenreView extends React.Component {
  render () {
    const { movie, movies, onBackClick } = this.props;

    return (
      <Container>
        <Card className="genre-view">
          <Card.Body>
            <Card.Title className="genre-name">
              <span className="value">{movie.Genre.Name}</span>
            </Card.Title>
            <Card.Text className="director-birthday">
              <span>Description: </span>
              <span className="value">{movie.Genre.Description}</span>
            </Card.Text>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Card.Body>
        </Card>
        <div>
          <h4>Some {movie.Genre.Name} movies</h4>
        </div>
        <div>
        </div>
      </Container>
    );
  }
}
GenreView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Actors: PropTypes.array
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

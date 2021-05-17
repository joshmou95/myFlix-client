import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
  render () {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="director-view">
        <Card.Body>
          <Card.Title className="director-name">
            <span className="label">Name: </span>
            <span className="value">{movie.Director.Name}</span>
          </Card.Title>
          <Card.Text className="director-birthday">
            <span>Born in: </span>
            <span className="value">{movie.Director.Birth}</span>
          </Card.Text>
          <Card.Text className="director-bio">
            <span>Biography: </span>
            <span className="value">{movie.Director.Bio}</span>
          </Card.Text>
          <Button onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}
DirectorView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    Actors: PropTypes.array
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

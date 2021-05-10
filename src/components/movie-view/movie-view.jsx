import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-view.scss';

export class MovieView extends React.Component {
  render () {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view">
        <div className="movie-poster">
          <Card.Img variant="top" src={movie.ImagePath} />
        </div>
        <Card.Body>
          <span className="label">Title: </span>
          <Card.Title className="movie-title">
            <span className="value">{movie.Title}</span>
          </Card.Title>
          <span className="label">Description: </span>
          <Card.Text className="movie-description">
            <span className="value">{movie.Description}</span>
          </Card.Text>
          <Button onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

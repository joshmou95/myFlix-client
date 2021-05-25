import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import './director-view.scss'
import { Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends React.Component {
  render () {
    const { movies, director, onBackClick } = this.props;

    return (
      <div>
        <Card className="director-view">
          <Card.Body>
              <Card.Title>
              <span className="value">{director.Name}</span>
              </Card.Title>
            <Card.Text className="director-birthday">
              <span>Born in: </span>
              <span className="value">{director.Birth}</span>
            </Card.Text>
            <Card.Text className="director-bio">
              <span>Biography: </span>
              <span className="value">{director.Bio}</span>
            </Card.Text>
            <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
          </Card.Body>
        </Card>

        <Container>
          <h4 className="mt-4">Some {director.Name} movies</h4>
        </Container>
      </div>
      
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }),
  onBackClick: PropTypes.func.isRequired
};

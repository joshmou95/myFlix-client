import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';

import { MovieCard } from '../movie-card/movie-card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
  render () {
    const { genre, onBackClick } = this.props;

    return (
      <div>
      <Card className="genre-view">
        <Card.Body>
            <Card.Title>
            <span className="value">{genre.Name}</span>
            </Card.Title>
          <Card.Text className="genre-discription">
            <span className="value">{genre.Description}</span>
          </Card.Text>
          <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
      {/* <Container>
        <Row>
          {
            movies.map( (m, i) => (
              <Col xs={4} lg={3} key={i} className="p-2">
                <MovieCard key={m._id} movie={m} />
              </Col>
            ))
          }
        </Row>
      </Container> */}
      </div> 
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
};


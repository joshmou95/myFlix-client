import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';

import { MovieCard } from '../movie-card/movie-card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class GenreView extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    const { movies, genre, onBackClick } = this.props;

    return (
      <div key={genre.props}>
      <Card className="genre-view m-3">
        <Card.Body>
            <Card.Title>
            <span className="value">{genre.Name}</span>
            </Card.Title>
          <Card.Text className="genre-discription">
            <span className="value">{genre.Description}</span>
          </Card.Text>
          <Button variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
          <h4 className="mt-4">Some {genre.Name} movies</h4><hr />
        {movies.map((m) => {
          if (m.Genre.Name === genre.Name) {
            return (
              <div className="d-inline-flex align-items-start" key={m._id}>
                <MovieCard movie={m} />
              </div>
            )
          }
        })}
      </div> 
    );
  }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired
};


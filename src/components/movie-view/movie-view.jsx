import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const url =
      "https://myflixdb2000.herokuapp.com/users/" +
      localStorage.getItem("user") + "/movies/" + movie._id;

    axios.post(url, "", { headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response);
        alert("Added to favorites");
      });
  }


  render () {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view p-1">
        <div className="movie-poster h-auto w-50 m-3">
          <Card.Img src={movie.ImagePath} />
        </div>
        <Card.Body>
          <span className="label">Title: </span>
          <Card.Title className="movie-title">
            <span className="value mx-3">{movie.Title}</span>
          </Card.Title>
          <span className="label">Description: </span>
          <Card.Text className="movie-description mx-3">
            <span className="value">{movie.Description}</span>
          </Card.Text>
          <Button variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="secondary">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="secondary">Genre</Button>
          </Link>
          <Button variant="danger" onClick={() => { this.addFavorite(movie); }}>Favorite</Button>
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

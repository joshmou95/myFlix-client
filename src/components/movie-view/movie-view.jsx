import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import axios from 'axios';
import './movie-view.scss';

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
      <div className="d-flex h-auto justify-content-center">
      <Card style={{ width: '50rem'}} className="movie-view p-1 m-3">
        <div>
          <Card.Img className="m-3 w-50" src={movie.ImagePath} />
        </div>
        <Card.Body>
          <span className="label">Title: </span>
          <Card.Title className="movie-title">
            <span className="value mx-3">{movie.Title}</span>
          </Card.Title>
          <span className="label">Description: </span>
          <Card.Text className="movie-description mx-3 w-75">
            <span className="value">{movie.Description}</span>
          </Card.Text>
          <span className="label">Directed by: </span>
          <Card.Text className="movie-director mx-3 w-75">
            {movie.Director.Name}
          </Card.Text>
          <Button variant="dark" className="mr-2" onClick={() => { onBackClick(null); }}>Back</Button>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="secondary" className="mr-2">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="secondary" className="mr-2">Genre</Button>
          </Link>
          <Button variant="danger" onClick={() => { this.addFavorite(movie); }}>Favorite</Button>
        </Card.Body>
      </Card>
      </div>
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

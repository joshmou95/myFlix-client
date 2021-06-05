import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from 'axios';
import { UpdateView } from '../update-view/update-view'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import ListGroup from 'react-bootstrap/ListGroup'

export class ProfileView extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser(token) {
    axios.get('https://myflixdb2000.herokuapp.com/users/' + localStorage.getItem("user"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies
        });
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://myflixdb2000.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Removed from favorites");
        this.componentDidMount();
      });
  }

  // delete token when logged out
  onLoggedOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const user = this.state;
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

  return (
    <div>
      <Card className="m-3">
        <Card.Body>
          {/* <Card.Title>Profile info:</Card.Title>
          <Card.Text>
            Username: {user.username} <br />
            Email: {user.email} <br />
            Birthday: {user.birthday} <br />
          </Card.Text> */}
          <UpdateView user={user} /><br />
        </Card.Body>
      </Card><br />
      <h3>Favorite Movies</h3>
        <div className="d-flex">
          {favoriteMovieList.map((m) => {
            return (
              <div  key={m._id}>
              <Card movie={m} className="movie-card m-2 p-1">
                <Card.Img className="w-100 h-50 poster" variant="top" src={m.ImagePath} />
                <Card.Body>
                  <Card.Title className="title h-auto w-100">{m.Title}</Card.Title>
                    <Button variant="danger" onClick={() => this.removeFavorite(m)}>Remove</Button>
                </Card.Body>
              </Card>
              </div>
            );
          })}
        </div>
    </div>
  )}
}

PropTypes.checkPropTypes(ProfileView.propTypes);
ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired
}


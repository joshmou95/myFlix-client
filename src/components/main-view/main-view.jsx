// requirement for creating a component
import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

// import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

// exposes MainView class component to use by other components
export class MainView extends React.Component {
  //  Create the component
  constructor () {
    // Initialize the state
    super();
    // executed when the component is created in memory
    // Initial state of movies is empty array
    // selectedMovie and user are set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  getMovies (token) {
    axios.get('https://myflixdb2000.herokuapp.com/movies', {
      // pass bearer auth in the header of the http reqest
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
      // Assign the result to the state
        this.setState({
          movies: response.data
        });
      });
  }

  // execute after the component is added to the DOM
  componentDidMount () {
    // get value of the token from localStorage
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      // call getMovies method GET request to movies endpoint
      this.getMovies(accessToken);
    }
  }

  /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie */
  setSelectedMovie (newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `authData` property in state to that particular user  from login-view. props.onLoggedIn(data) */
  onLoggedIn (authData) {
    console.log(authData);
    this.setState({
      // Username saved in the user state
      user: authData.user.Username
    });
    // token and username saved in localStorage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    // get movies from API once logged in to MainView class
    this.getMovies(authData.token);
  }

  onRegister (register) {
    this.setState({
      register
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

  // returns visual representation of the component
  render () {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)}/>;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    /* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all movies will be returned */
    return (
      <div>
        <button onClick={() => { this.onLoggedOut() }}>Logout</button>
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              )
            : (
                movies.map(movie => (
                  <Col md={3}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
                ))
              )
          }
        </Row>
      </div>
    );
  }
}

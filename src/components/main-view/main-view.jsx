// requirement for creating a component
import React from 'react';
import axios from 'axios';

import './main-view.scss';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view/';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      // selectedMovie: null,
      user: null
    };
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

  getMovies (token) {
    // axios.get('http://localhost:8080/movies', {
    axios.get('https://myflixdb2000.herokuapp.com/movies', {
      // pass bearer auth in the header of the http reqest
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `authData` property in state to that particular user  from login-view. props.onLoggedIn(data) */
  onLoggedIn (authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // delete token when logged out
  // onLoggedOut () {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.setState({
  //     user: null
  //   });
  // }
  /* <button onClick={() => { this.onLoggedOut() }}>Logout</button> */

  // returns visual representation of the component
  render () {
    const { movies, user } = this.state;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ));
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />;
            return <Col>
              <RegistrationView />
            </Col>;
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>;
          }} />
          <Route path="/genres/:name" render={ ({ match }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre } onBackClick={() => history.goBack()} />
            </Col>;
          }} />
          <Route path="/director/:name" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            // if there are no movies return main-view
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              {/* find directors name from the database */}
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>;
          }
          } />
        </Row>
      </Router>
    );
  }
}

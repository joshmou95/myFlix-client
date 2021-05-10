// requirement for creating a component
import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

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

  componentDidMount () {
    // execute after the component is added to the DOM
    // fetch the movies api with axios
    axios.get('https://myflixdb2000.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie */
  setSelectedMovie (newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that particular user */
  onLoggedIn (user) {
    this.setState({
      user
    });
  }

  onRegister (register) {
    this.setState({
      register
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
    );
  }
}

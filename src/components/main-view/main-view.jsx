// requirement for creating a component
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';


import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view/';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavView } from '../nav-view/nav-view';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './main-view.scss';


// exposes MainView class component to use by other components
class MainView extends React.Component {
  //  Create the component
  constructor (props) {
    // Initialize the state
    super(props);
    // executed when the component is created in memory
    // User is set to null
    this.state = {
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
    axios.get('https://myflixdb2000.herokuapp.com/movies', {
      // pass bearer auth in the header of the http reqest
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // # 4
        this.props.setMovies(response.data);
        })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `authData` property in state to that particular user  from login-view. props.onLoggedIn(data) */
  onLoggedIn (authData) {
    this.props.setUser(authData);
    this.setState({
      user: authData.user.Username
    });
    // this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
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
    // #5 movies is extracted from this.props rather than this.state
    let { movies } = this.props;
    let { user } = this.state;
    // token = localStorage.getItem('token');
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
    return (
        <Router>
        {/* <NavView /><br /> */}
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if ( !user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
              <Container fluid className="d-flex flex-column">
                <Row>
                  <Col className="p-0">
                    <NavView user={user} />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <MoviesList movies={movies} />
                </Row>
              </Container>
            );
          }} />
            <Route exact path="/register" render={() => {
              if (user) return <Redirect to="/" />;
              return <RegistrationView />
            }} />
            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Container>
                  <Row>
                    <Col className="p-0">
                      <NavView user={user} />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col md={8}>
                      <MovieView 
                      movie={movies.find(m => m._id === match.params.movieId)} 
                      onBackClick={() => history.goBack()} />
                    </Col>
                  </Row>
              </Container>
              );
            }} />
            <Route path="/genres/:name" render={ ({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Container>
                  <Row>
                    <Col className="p-0">
                      <NavView user={user} />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col md={10}>
                      <GenreView 
                      genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                      movies={movies}
                      onBackClick={() => history.goBack()} />
                    </Col>
                  </Row>
              </Container>
              );
            }} />
            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Container>
                  <Row>
                    <Col className="p-0">
                      <NavView user={user}  />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col md={10}>
                      {/* find directors name from the database */}
                      <DirectorView 
                      director={movies.find(m => m.Director.Name === match.params.name).Director}
                      movies={movies}
                      onBackClick={() => history.goBack()} />
                    </Col>
                  </Row>  
                </Container>
              );
            }} />
            <Route path="/users/:Username" render={({ history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              if (movies.length === 0) return <div className="main-view" />;
              return ( 
                <Container>
                  <Row>
                    <Col className="p-0">
                      <NavView user={user} />
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col md={10}>
                      <ProfileView 
                      user={user} 
                      movies={movies} />
                    </Col>
                  </Row>  
                </Container>
              );
            }} />
          </Row>
        </Router>
    );
  }
}

// mapStateToProps take the state as a parameter and returns an object
// let mapStateToProps = state => {
//   return { movies: state.movies }
// }
let mapStateToProps = state => {
  const { user, movies } = state;
  return {
    user,
    movies
  }
  
}

// movies state is extracted from the store through the connect() function
// before being passed as the movies prop for the MainView component
// finally the movies prop is passed to MovieList as a prop of the same name movies
// setMovies is given as a prop to MainView because it is wrapped in the connect() function
export default connect(mapStateToProps, { setMovies, setUser } )(MainView);
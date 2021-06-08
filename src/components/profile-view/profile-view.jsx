import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';

import './profile-view.scss';


export class ProfileView extends React.Component {
  constructor() {
    super();
    (this.Username = null), (this.Password = null), (this.Email = null), (this.Birthday = null);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const url = 'https://myflixdb2000.herokuapp.com/users/'
    const user = localStorage.getItem("user")
    axios
      .get(url + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    const url = 'https://myflixdb2000.herokuapp.com/users/';
    const user = localStorage.getItem("user");
    
    axios.delete(url + user + "/movies/" + movie._id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Removed from favorites");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const url = 'https://myflixdb2000.herokuapp.com/users/';

    axios({
      method: 'put',
      url: url + user,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        alert('Changes have been saved!');
        localStorage.setItem('user', this.state.Username);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  deRegister(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const url = 'https://myflixdb2000.herokuapp.com/users/';

    axios.delete(url + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/register');
        alert('Your account has been deleted');
      })
      .catch((e) => {
        console.log('error deleting the user');
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const username = localStorage.getItem('user');
    const { movies } = this.props;
    // const user = this.state;  

  return (
    <div>
      <Card className="m-3">
        <Card.Body>
          <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
            <Row className="justify-content-center">
              <Col xs={8} lg={6}><br></br>
                <h5>Update your Profile</h5>
                <Form.Group controlId="BasicUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text"
                  placeholder="Change Username"
                  autoComplete="username"
                  onChange={(e) => this.setUsername(e.target.value )} 
                  pattern='[a-zA-Z0-9]{5,}'
                  minLength="5" />
                  <Form.Control.Feedback type='invalid'>Enter a Username with at least 5 alphanumeric characters</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicPassword">
                  <Form.Label>Password:*</Form.Label>
                  <Form.Control type="password"
                  placeholder="Enter current or new Password"
                  autoComplete="password"
                  onChange={(e) => this.setPassword(e.target.value )} minLength="5" required />
                  <Form.Control.Feedback type='invalid'>Enter a valid password with at least 5 characters</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email"
                  placeholder="Change email" 
                  autoComplete="email"
                  onChange={(e) => this.setEmail(e.target.value )} />
                  <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type="date"
                  onChange={(e) => this.setBirthday(e.target.value )} />
                  <Form.Control.Feedback type='invalid'>Please enter a valid date.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="dark" type="submit">Update</Button><hr />
                <p>Deregister Account: - Cannot be undone!</p>
                <Button variant="danger" type="submit" onClick={(e) => this.deRegister(e)}>Deregister</Button>
              </Col>
            </Row>
          </Form>

        </Card.Body>
      </Card>
      <Card className='profile-card p-2 m-2'>
        <Card.Title className='profile-title'>{username}'s Favorite Movies</Card.Title>
          {FavoriteMovies.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>}
          <div className='favorites-container'>
              {FavoriteMovies.length > 0 && movies.map((movie) => {
                if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                  return (
                    <div key={movie._id}>
                        <Card style={{ width: '12rem', float: 'left' }}>
                            <Card.Img className='favorites-movie p-2' variant="top" src={movie.ImagePath} />
                            <Card.Body className='movie-card-body'>
                              <Button className='remove-favorite' variant='danger' 
                                onClick={() => this.removeFavorite(movie)}> Remove
                              </Button>
                            </Card.Body>
                          </Card>
                    </div>
                    );
                    }
                  })}
          </div>
      </Card>
    </div>
  )}
}

PropTypes.checkPropTypes(ProfileView.propTypes);
ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  const { user, movies } = state;
  return { 
    user, 
    movies 
  }
}

export default connect(mapStateToProps, { setUser })(ProfileView);

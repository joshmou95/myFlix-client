import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

export function LoginView (props) {
  /* call useState() method with an empty string, the initial value of the login variable. This method returns an arry that you destructure */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    // method prevents the default refresh/change of the page from handleSubmit method
    e.preventDefault();
    /* Send a request to the server for authentication then call props.onLoggedIn(username) */
    axios.post('https://myflixdb2000.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
      });
  };

  return (
    <Row>
      <Form>
        <br></br>
        <div xs={8} lg={6}>
          <h3>Login to MyFlix</h3>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
            required />
            </Form.Group>
            <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Password"
              required />
          </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit </Button>
            <hr />
            <Link to="/register">
              <Button variant="info" type="button"> Register</Button>
            </Link>
        </div>
      </Form>
    </Row>
  );
}
LoginView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};

import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

export function LoginView (props) {
  /* call useState() method with an empty string, the initial value of the login variable. This method returns an arry that you destructure */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const validated = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflixdb2000.herokuapp.com/login', null, {
      params: {
      Username: username,
      Password: password
    }})
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user');
      alert('Please try again');
    });
  };

  return (
    <Card className="p-4 m-3 justify-content-md-center">
      <Col>
        <Form noValidate validated={validated}>
          <br></br>
            <h3>Login to MyFlix</h3>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              pattern='[a-zA-Z0-9]{5,}'
              required minLength="5" />
              <Form.Control.Feedback type='invalid'>Enter your Username with at least 5 characters</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                value={password}
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                autoComplete="password" 
                minLength="5"
                required />
                <Form.Control.Feedback type='invalid'>Enter your password with at least 5 characters</Form.Control.Feedback>
            </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>Submit </Button>
              <hr />
              <p>Don't have an account?</p>
              <Link to="/register">
                <Button variant="info" type="button"> Register</Button>
              </Link>
        </Form>
      </Col>
    </Card>
  );
}
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};

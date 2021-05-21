import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';

export function RegistrationView (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('http://localhost:8080/users', {
    axios.post('https://myflixdb2000.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        // '_self' will open in the current tab
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user');
      });
  };

  return (
    <div>
      <Form>
        <Row className="justify-content-md-center">
          <Col xs={8} lg={6}><br></br>
            <h3>Register for MyFlix</h3>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="FormEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.number
  })
};

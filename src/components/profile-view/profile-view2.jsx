import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export function ProfileView ({ setUser, user }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const validated = useState(null);

  const token = localStorage.getItem('token');
  const name = localStorage.getItem("user");

  const handleUpdate = (e) => {
    e.preventDefault();
    
    axios.put('https://myflixdb2000.herokuapp.com/users/' + name, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(user => {
        console.log(user);
        setUser(user);
        // '_self' will open in the current tab
        window.open('_self');
      })
      .catch(e => {
        console.log('error updating the user');
      });
  };

  const deRegister = (e) => {
    e.preventDefault();

    axios.delete('https://myflixdb2000.herokuapp.com/users/' + name, { 
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log(response);
        setUser({
          user: null,
          token: null
        });
        // '_self' will open in the current tab
        window.open('/register');
      })
      .catch(e => {
        console.log('error deleting the user');
      });
  };

  return (
    <Card className="m-3">
      <Form>
        <Row noValidate validated={validated} className="justify-content-center">
          <Col xs={8} lg={6}><br></br>
            <h5>Update your Profile</h5>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" 
              placeholder={`${user}`} 
              autoComplete="username"
              onChange={e => setUsername(e.target.value)} 
              minLength="5" required />
              <Form.Control.Feedback type='invalid'>Enter a Username with at least 5 characters</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" 
              placeholder="Enter password"
              autoComplete="password"
              onChange={e => setPassword(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Enter a password with at least 5 characters</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="FormEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" 
              placeholder="Enter Email"
              value={email}
              autoComplete="email"
              onChange={e => setEmail(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" 
              value={birthday} 
              onChange={e => setBirthday(e.target.value)} />
              <Form.Control.Feedback type='invalid'>Please enter a valid date.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="dark" type="submit" onClick={handleUpdate}>Update</Button>
            <Form.Group><br />
            <p>Deregister Account: - Cannot be undone!</p>
            <Button variant="danger" type="submit" onClick={deRegister}>Deregister</Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

ProfileView.prototype = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { user } = state;
  return user 
}

export default connect(mapStateToProps, { setUser })(ProfileView);
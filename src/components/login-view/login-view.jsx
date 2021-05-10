import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView (props) {
  /* call useState() method with an empty string, the initial value of the login variable. This method returns an arry that you destructure */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    // method prevents the default refresh/change of the page from handleSubmit method
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div>
      <Form>
      <Row className="justify-content-md-center">
      <Col md={6}><br></br>
      <h3>Login to MyFlix</h3>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Col>
        </Row>
      </Form>
    </div>
  );
}
LoginView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};

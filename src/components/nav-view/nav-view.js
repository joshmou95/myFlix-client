import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export class NavView extends React.Component {
  constructor (props) {
    super (props)
  }
  
  onLoggedOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  
  render () {

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="d-flex">
      <Navbar.Brand as={Link} to={"/"}>MyFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">    
        <Nav.Link as={Link} to={`/users/${this.props.user}`}>Profile</Nav.Link>
        <Nav.Link href="/" onClick={() => { this.onLoggedOut() }}>Log Out</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
    );
  }
}
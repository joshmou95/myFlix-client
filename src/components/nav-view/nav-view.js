import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export class NavView extends React.Component {
  onLoggedOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  
  render () {
    // const user = localStorage.getItem('user');
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="d-flex">
      <Navbar.Brand href={`/`}>MyFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">    
        <Nav.Link href={`/users/${this.user}`}>Profile</Nav.Link>
        <Nav.Link href={`/`} onClick={() => { this.onLoggedOut() }}>Log Out</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
    );
  }
}
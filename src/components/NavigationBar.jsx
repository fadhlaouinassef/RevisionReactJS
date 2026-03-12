import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavigationBar() {
  const activeStyle = {
    textDecoration: "underline",
    fontWeight: "bold"
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">My Events App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/events" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Events
            </Nav.Link>
             <Nav.Link as={NavLink} to="/about" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              About
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/events/add" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Add New Event
            </Nav.Link>
            <Nav.Link as={NavLink} to="/properties" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Properties
            </Nav.Link>
            <Nav.Link as={NavLink} to="/properties/add" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Add New Property
            </Nav.Link>
            <Nav.Link as={NavLink} to="/quizzes" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Quizzes
            </Nav.Link>
            <Nav.Link as={NavLink} to="/quizzes/add" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Add New Quiz
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

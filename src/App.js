import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from 'aws-amplify';
import "./App.css";
import Routes from './Routes';

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push('/login');
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (err) {
      if (err !== 'No current user') {
        alert(err);
      }
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            { isAuthenticated
              ? <NavItem onClick={handleLogout}>Logout</NavItem>
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
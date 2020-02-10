import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// IMPORT CONTACT'S ACTIONS COMPONENTS
import CreateContact from "./components/create-contact";
import EditContact from "./components/edit-contact";
import ContactsList from "./components/contacts-list";

function App() {
  return (
    <Router>
      <div>
        <div style={{ marginBottom: '5%' }}>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/contacts-list"} className="nav-link" style={{color: 'lightgrey'}}>
                  MyContacts App
              </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-contact"} className="nav-link" style={{color: 'lightgrey'}}>
                    Create New Contact
                </Link>
                </Nav>
                <Nav>
                  <Link to={"/contacts-list"} className="nav-link" style={{color: 'lightgrey'}}>
                    Contacts List
                </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <div>
          <Container>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Switch>
                    <Route exact path='/' component={ContactsList} />
                    <Route path="/create-contact" component={CreateContact} />
                    <Route path="/edit-contact/:id" component={EditContact} />
                    <Route path="/contacts-list" component={ContactsList} />
                  </Switch>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;

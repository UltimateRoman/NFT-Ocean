import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <div>
      <div style={{ paddingBottom: "10px", backgroundColor: "blue" }}></div>

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
            <h3>NFT Ocean      </h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/">
                <h4>Home</h4></Nav.Link>
                &emsp;&emsp;&emsp;&emsp;
            <Nav.Link href="/">
                <h4>Gallery</h4></Nav.Link>
                &emsp;&emsp;&emsp;&emsp;
            <Nav.Link href="/">
                <h4>NFT</h4></Nav.Link>
                &emsp;&emsp;&emsp;&emsp;
            <Nav.Link href="/">
                <h4>Profile</h4>
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
      <div style={{ paddingBottom: "8px", backgroundColor: "lightblue" }}></div>
    </div>
  );
}

export default Header;
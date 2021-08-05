import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
  return (
    <div>
      <div style={{ paddingBottom: "10px", backgroundColor: "blue" }}></div>

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
            <h3>NFT Ocean</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/">
                <h4>Home</h4></Nav.Link>
                &emsp;&emsp;&emsp;&emsp;

            <Nav.Link href="/mint">
                <h4>Mint NFT</h4></Nav.Link>
                &emsp;&emsp;&emsp;&emsp;
            
            <NavDropdown title="Auction House" style={{fontSize:24}} id="basic-nav-dropdown">
                <NavDropdown.Item href="/english">English Auction</NavDropdown.Item>
                <NavDropdown.Item href="/dutch">Dutch Auction</NavDropdown.Item>
                <NavDropdown.Item href="/vickery">Vickery Auction</NavDropdown.Item>
            </NavDropdown>
                &emsp;&emsp;&emsp;&emsp;

            <Nav.Link href="/yournfts">
                <h4>Your NFTs</h4>
            </Nav.Link>
                &emsp;&emsp;&emsp;&emsp;

            <Nav.Link href="/offersr">
                <h4>Offers Received</h4>
            </Nav.Link>
            &emsp;&emsp;&emsp;&emsp;

            <Nav.Link href="/offersp">
                <h4>Offers Placed</h4>
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
      <div style={{ paddingBottom: "8px", backgroundColor: "lightblue" }}></div>
    </div>
  );
}

export default Header;
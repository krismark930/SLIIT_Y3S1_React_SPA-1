import React, { Component, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar-style.scss";

const MainNavbar = props => {
    const [logingStatus, setLogingStatus] = useState({
        loggedin: true,
        hidden: false
    });

    const signOut = () => {};

    return (
        <div className="navbar-head">
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" style={{ width: "100%", backgroundColor: "dark" }}>
                <Navbar.Brand href="#home">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Shop</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav className=" float-right">
                        <Nav.Link href="#contact_us">Contact Us</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        {logingStatus.loggedin ? (
                            <div className="signoutHeader" onClick={() => signOut()}>
                                <Nav.Link href="#sign_out">
                                    {" "}
                                    <Button variant="outline-success" style={{ padding: "3px" }}>Sign Out</Button>
                                </Nav.Link>
                            </div>
                        ) : (
                            <Nav>
                                <Nav.Link href="#sign_in">
                                    <Button variant="outline-success" style={{ padding: "3px" }}>Sign In</Button>
                                </Nav.Link>
                            </Nav>
                        )}
                        {/* {logingStatus.hidden ? null : <CartDropdown />} */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default MainNavbar;

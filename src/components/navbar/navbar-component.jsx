import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar-style.scss";
import { FaCartArrowDown } from "react-icons/fa";
import { IconContext } from "react-icons";
import CartDropdown from "../cart-dropdown/cart-dropdown-component";
import { AppContext } from "../../Context/app-context";

const MainNavbar = (props) => {
  const appContext = useContext(AppContext);

  return (
    <div className="navbar-head">
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        style={{ width: "100%", backgroundColor: "dark" }}
      >
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
            {appContext.loggedin ? (
              <Nav>
                <Link to="/store-managers">Store Managers</Link>
                <Nav.Link onClick={appContext.setWishListmethod}>
                  <Link to="/wishlist">
                    <Button
                      variant="outline-success"
                      style={{ padding: "3px" }}
                    >
                      Wish List
                    </Button>
                  </Link>
                </Nav.Link>
                <Link to="/categories">Categories</Link>
                <div className="dripdowntoggles">
                  <Nav.Link
                    onClick={appContext.toggleDropdownHidden}
                    className="cartDropdownNavBar"
                  >
                    <IconContext.Provider
                      value={{
                        color: "white",
                        className: "global-class-name",
                        size: "2rem",
                      }}
                    >
                      <FaCartArrowDown />
                    </IconContext.Provider>
                  </Nav.Link>
                  {appContext.hidden ? null : <CartDropdown />}
                </div>
                <Nav.Link onClick={appContext.logout}>
                  <Link to="/">
                    <Button
                      variant="outline-success"
                      style={{ padding: "3px" }}
                    >
                      Sign Out
                    </Button>
                  </Link>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Link to="/signin-signup">
                  <Button
                    variant="outline-success"
                    style={{ padding: "3px", margin: "4px 6px" }}
                  >
                    Sign In
                  </Button>
                </Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MainNavbar;

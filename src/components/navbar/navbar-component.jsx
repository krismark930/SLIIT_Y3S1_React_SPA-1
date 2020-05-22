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
  console.log(appContext);
  return (
    <div className="navbar-head">
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        style={{ width: "100%", backgroundColor: "dark" }}
      >
        <Link to="/">
          <Navbar.Brand href="#home">Home</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Shop</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className=" float-right">
            {appContext.loggedin ? (
              <Nav>
                {appContext.checkCustomer ? (
                  <Link to="/wishlist">
                    <Nav.Link href="#about">Wish List</Nav.Link>
                  </Link>
                ) : null}

                {appContext.checkAdmin ? (
                  <Nav>
                    <Link to="/store-managers">
                      <Nav.Link href={"/store-managers"}>
                        Store Managers
                      </Nav.Link>
                    </Link>
                    <Link to="/categories">
                      <Nav.Link href={"/categories"}>Categories</Nav.Link>
                    </Link>
                  </Nav>
                ) : null}

                <Nav.Link href="#contact_us">Contact Us</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                {appContext.checkCustomer ? (
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
                ) : null}

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
                <Nav.Link href="#contact_us">Contact Us</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
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

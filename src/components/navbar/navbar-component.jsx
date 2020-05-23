import React, {useContext} from "react";
import {Button, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./navbar-style.scss";
import {FaCartArrowDown} from "react-icons/fa";
import {IconContext} from "react-icons";
import CartDropdown from "../cart-dropdown/cart-dropdown-component";
import {AppContext} from "../../Context/app-context";

const MainNavbar = () => {
  const appContext = useContext(AppContext);
  console.log(appContext);
  return (
    <div className="navbar-head">
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="md"
        variant="dark"
        style={{width: "100%", backgroundColor: "currentColor"}}
      >
        <Link to="/">
          <Navbar.Brand href="#home">Home</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"/>
          <Nav className=" float-right">
            {appContext.loggedin ? (
              <Nav>
                {appContext.checkCustomer ? (
                  <Nav>
                    <Link to="/wishlist" id="wislistLink">
                      <Nav.Link href="#wish_list">Wish List</Nav.Link>
                    </Link>
                    <Link to="/comment">
                      <Nav.Link href="#comments">Comments</Nav.Link>
                    </Link>
                    <Nav>
                      <Nav.Link href="#contact_us">Contact Us</Nav.Link>
                      <Nav.Link href="#about_us">About Us</Nav.Link>
                    </Nav>
                  </Nav>
                ) : null}
                {appContext.checkAdmin ? (
                  <Nav>
                    <Link
                      to="/store-managers"
                      style={{
                        textDecoration: "none",
                        marginTop: "8px",
                      }}
                    >
                      <Nav.Link href="#store_managers">Store Managers</Nav.Link>
                    </Link>
                    <Link
                      to="/categories"
                      style={{
                        textDecoration: "none",
                        marginTop: "8px",
                      }}
                    >
                      <Nav.Link href="#categories">Categories</Nav.Link>
                    </Link>
                  </Nav>
                ) : null}
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
                        <FaCartArrowDown/>
                      </IconContext.Provider>
                    </Nav.Link>
                    {appContext.hidden ? null : <CartDropdown/>}
                  </div>
                ) : null}
                <Nav.Link onClick={appContext.logout}>
                  <Link to="/">
                    <Button
                      variant="outline-primary"
                      style={{
                        padding: "4px",
                        // margin: "4px 6px",
                        color: "white",
                      }}
                    >
                      Sign Out
                    </Button>
                  </Link>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="#contact_us">Contact Us</Nav.Link>
                <Nav.Link href="#about_us">About Us</Nav.Link>
                <Link to="/signin-signup">
                  <Button
                    variant="outline-primary"
                    style={{
                      padding: "4px",
                      margin: "4px 6px",
                      color: "white",
                    }}
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

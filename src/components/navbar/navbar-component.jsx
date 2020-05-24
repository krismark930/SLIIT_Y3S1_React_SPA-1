import React, { useContext, useState } from "react";
import { Button, Modal, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar-style.scss";
import { FaCartArrowDown } from "react-icons/fa";
import { IconContext } from "react-icons";
import CartDropdown from "../cart-dropdown/cart-dropdown-component";
import { AppContext } from "../../Context/app-context";

const MainNavbar = () => {
  const appContext = useContext(AppContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(appContext);

  const setConfirmedCardCancel = () => {
    console.log("wishlist click kala");
    appContext.setFalsePayUserConfirmed();
    appContext.setFalsePayCardConfirmed();
  };
  return (
    <div className="navbar-head">
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="md"
        variant="dark"
        style={{ width: "100%", backgroundColor: "currentColor" }}
      >
        <Navbar.Brand
          href="#home"
          // style={{ fontFamily: "Dancing Script", fontSize: "20px" }}
        >
          <img
            style={{ height: "30px", width: "30px" }}
            src={require("../../assets/logo512.png")}
          />
        </Navbar.Brand>
        <Link to="/">
          <Navbar.Brand
            href="#home"
            style={{ fontFamily: "Dancing Script", fontSize: "20px" }}
          >
            Online ShoppingMall
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav className=" float-right">
            {appContext.loggedin ? (
              <Nav>
                {appContext.checkCustomer ? (
                  <Nav>
                    <Link
                      to="/wishlist"
                      id="wislistLink"
                      onClick={() => {
                        setConfirmedCardCancel();
                      }}
                    >
                      <Nav.Link href="#wish_list">Wish List</Nav.Link>
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

                {appContext.checkStoreManager ? (
                  <Nav>
                    <Link to="/add-product">
                      <Nav.Link href="#wish_list">Add Product</Nav.Link>
                    </Link>

                    <Nav>
                      <Nav.Link href="#contact_us">Contact Us</Nav.Link>
                      <Nav.Link href="#about_us">About Us</Nav.Link>
                    </Nav>
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
                        <FaCartArrowDown />
                      </IconContext.Provider>
                    </Nav.Link>
                    {appContext.hidden ? null : <CartDropdown />}
                  </div>
                ) : null}
                <Nav.Link onClick={handleShow}>
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
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="#contact_us">Contact Us</Nav.Link>

                <Nav.Link href="#about_us">About Us</Nav.Link>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              margin: "auto",
              width: "100%",
              fontWeight: "700",
              fontStyle: "italic",
            }}
          >
            Do you really wanna logout
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/">
            <Button variant="danger" onClick={appContext.logout}>
              Confirm Logout
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainNavbar;

import { useState } from "react";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import RegisterModal from "../Modal/RegisterModal";

import LoginModal from "../Modal/LoginModal";
import { useHistory } from "react-router";
import { logo } from "../../assets";
function GuestNav(props) {
  const router = useHistory();
  const [show, setShow] = useState(false);
  const [showRegis, setShowRegis] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowRegis = () => setShowRegis(true);
  const handleCloseRegis = () => setShowRegis(false);

  return (
    <div className="nav-headers img-fluid">
      <Navbar collapseOnSelect expand="lg">
        <Container className="d-flex justify-content-between mt-3">
          <Navbar.Brand>
            <img
              src={logo}
              onClick={() => router.push("/")}
              style={{ padding: "4px" }}
              alt="brand"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Button
              variant="outline-primary"
              onClick={handleShow}
              className="button-login"
            >
              Login
            </Button>
            <Button onClick={handleShowRegis} className="button1">
              Register
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal
        show={show}
        handleClose={handleClose}
        regis={handleShowRegis}
        setData={props.setData}
      />
      <RegisterModal
        show={showRegis}
        handleClose={handleCloseRegis}
        login={handleShow}
      />
    </div>
  );
}

export default GuestNav;

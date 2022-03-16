import { useState, useRef, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import ModalSignin from "./Modal/ModalSignin";
import ModalSignup from "./Modal/ModalSignup";
import UserDropdown from "./Dropdown/UserDropdown";

import { API } from "../config/api";

import logo from "../assets/images/logo.svg";
import logowhite from "../assets/images/logowhite.svg";

const Header = () => {
  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  const [showSignup, setshowSignup] = useState(false);
  const [user, setUser] = useState([]);
  const [newUser, setNewUser] = useState(false);
  const [show, setshow] = useState(false);

  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!state.isLogin) {
      setshow(true);
    }
    return () => {
      setshow(false);
    };
  }, [state]);

  const router = useHistory();
  const handlePushToSignUp = () => {
    router.push("/signup");
  };

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };
  // console.log(state.user.listAs)
  const getUser = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [newUser]);

  const ClickHereLogin = () => {
    setshow(false);
    setshowSignup(true);
  };

  const ClickHereRegister = () => {
    setshowSignup(false);
    setshow(true);
  };

  console.log(user);

  return (
    <>
      {state.isLogin === true && (
        <Navbar
          expand="lg"
          style={{
            backgroundColor: "#F1F1F1",
            boxShadow: "3px 3px 3px 3px #ccc",
          }}
        >
          <Link to="/" className="navbar-brand mx-5" id="logo">
            <img src={logo} alt="brand" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <div id="userDropd" className="me-5 ms-5">
              <UserDropdown data={user} dataState={state} />
            </div>
          </Navbar.Collapse>
        </Navbar>
      )}
      {!state.isLogin && (
        <div className="nav-headers img-fluid">
          <Navbar
            collapseOnSelect
            expand="lg"
            fixed="top"
            id={navBackground === true ? "navbar" : null}
          >
            <Container className="d-flex justify-content-between mt-3">
              <Navbar.Brand>
                <Link to="/" className="navbar-brand" id="logo">
                  <img src={logowhite} alt="brand" />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto"></Nav>

                <Button
                  variant="outline-primary"
                  // id="btnLogin"
                  className="button-login"
                  onClick={() => setshow(true)}
                >
                  Login
                </Button>

                <Button className="button1" onClick={() => setshowSignup(true)}>
                  Register
                </Button>
                <ModalSignin
                  ClickHereLogin={ClickHereLogin}
                  show={show}
                  handleClose={() => setshow(false)}
                  handleLogin={dispatch}
                />

                <ModalSignup
                  showSignup={showSignup}
                  ClickHereRegister={ClickHereRegister}
                  handleClose={() => setshowSignup(false)}
                />
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
      <div className="text-white container content-global-journey">
        <h1 className="journey">
          The Journey <br /> you ever dreamed of.
        </h1>
        <p className="journey-down">
          We made a tool so you can easily keep & share your travel memories.
          <br />
          But there is a lot more
        </p>
      </div>
    </>
  );
};

export default Header;

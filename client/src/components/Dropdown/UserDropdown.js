import { React } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BsCalendar } from "react-icons/bs";
import userIcon from "../../assets/images/userIcon.svg";
import newJourneyIcon from "../../assets/images/newJourneyIcon.svg";
import bookmarkIcon from "../../assets/images/bookmarkIcon.svg";
import Logout from "../../assets/images/logout.svg";

import { Dropdown } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import {
  Card,
  Jumbotron,
  Row,
  Col,
  Button,
  DropdownButton,
  Image,
} from "react-bootstrap";
import { setAuthToken } from "../../config/api";
import Triangle from "../../assets/images/triangle.svg";
import { image2 } from "../../assets";
function UserDropdown(data) {
  const [state, dispatch] = useContext(UserContext);
  // console.log(data.data.image)
  data = data.data;

  // console.log(data)
  console.log(state);

  // console.log(state.user.image)
  const handleLogout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
    setAuthToken();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const userFilter = userData.filter(item => ( item.username === userlogin ));

  return (
    <>
      <div>
        <Dropdown align="start">
          <Dropdown.Toggle
            variant=" btn-sm "
            style={{ backgroundColor: "transparent", border: "none" }}
            id="dropdown-basic"
          >
            {state.user.image !== "http://localhost:5000/uploads/null" ? (
              <Image id="avatarStyle" src={state.user.image} roundedCircle />
            ) : (
              <Image
                id="avatarStyle"
                src="https://ujhw03sswsepgw3234x0qm51-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/171025-202659-Donnely-Christopher-400x400x72.jpg"
                roundedCircle
              />
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ width: "220px", marginTop: "10px" }}>
            <div id="imgTriangle"></div>
            <Dropdown.Item>
              <Row>
                <Col sm="2">
                  {" "}
                  <Link to="/profile">
                    <img src={userIcon} id="userIcon" />{" "}
                  </Link>
                </Col>
                <Col sm="2">Profile</Col>
              </Row>
            </Dropdown.Item>
            {/* <Dropdown.Item >

              <Row>
                <Col sm="2"> <img src={newJourneyIcon} id="journeyIcon" /> </Col>
                <Col sm="2">
                  <Link to="/ListJourney" id="dropText" >List Journey</Link>
                </Col>
              </Row>
            </Dropdown.Item> */}

            <Dropdown.Item>
              <Row>
                <Col sm="2">
                  {" "}
                  <Link to="/addjourney">
                    <img
                      src={image2}
                      id="bookmarkIcon"
                      style={{ width: "25px", marginLeft: "-2px" }}
                    />{" "}
                  </Link>
                </Col>
                <Col sm="2">New Journey</Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item>
              <Row>
                <Col sm="2">
                  {" "}
                  <Link to="/Bookmark">
                    <img src={bookmarkIcon} id="bookmarkIcon" />{" "}
                  </Link>
                </Col>
                <Col sm="2">Bookmark</Col>
              </Row>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Row>
                <Col sm="2">
                  {" "}
                  <Link to="/" onClick={handleLogout}>
                    <img src={Logout} id="logoutIcon" />{" "}
                  </Link>
                </Col>
                <Col sm="2">Logout</Col>
              </Row>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}
export default UserDropdown;

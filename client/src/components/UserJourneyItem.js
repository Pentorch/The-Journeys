import { useHistory } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import ModalSignin from "./Modal/ModalSignin";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import draftToHtml from "draftjs-to-html";

import ExpendableText from "./ExpendableText";
var striptags = require("striptags");

function UserJourney({ data, handleDelete }) {
  const router = useHistory();
  const [show, setshow] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const handlePushToUpdate = (id) => {
    // console.log(id);
    router.push(`updatejourney/${id}`);
  };

  return (
    <>
      <>
        {/* <p>ansdnaskd</p> */}
        <Row>
          {data.map((item, index) => (
            <>
              <Col md={3} key={item.id}>
                <Card id="styleCard" className="grow">
                  {/* <label className="block-check"></label> */}
                  <div class="wrapCardImgProfile">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      id="imgCard"
                      style={{
                        objectFit: "cover",
                        height: "180px",
                        width: "100%",
                        borderRadius: "8px",
                      }}
                    />
                    {
                      state.isLogin == true ? (
                        <>
                          <div
                            id="wrapEditIcon"
                            onClick={() => handlePushToUpdate(item.id)}
                          >
                            <FaRegEdit id="editIcon" />
                          </div>
                          <div
                            id="wrapDeleteIcons"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FiTrash id="deleteIcon" />
                          </div>
                        </>
                      ) : null
                      // <Button id="btnCard" onClick={() => setshow(true)} class="btns">Order Now</Button>
                    }
                  </div>
                  <Card.Body>
                    <Card.Title id="cardTitle">
                      <span id="titleCardList" className="inner">
                        {item.title}
                      </span>
                      <span id="dateCardList" className="inner">
                        {" "}
                        {item.createdAt} {item.user.fullName}{" "}
                      </span>

                      <ExpendableText maxHeight={85} id="descriptionCardList">
                        {striptags(draftToHtml(JSON.parse(item.description)))}
                      </ExpendableText>
                    </Card.Title>
                  </Card.Body>
                  <ModalSignin show={show} handleClose={() => setshow(false)} />
                </Card>
              </Col>
            </>
          ))}
        </Row>
      </>
    </>
  );
}

export default UserJourney;

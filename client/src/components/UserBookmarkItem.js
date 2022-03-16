import { Card, Row, Col } from "react-bootstrap";
import ModalSignin from "./Modal/ModalSignin";
import { useState, useContext } from "react";

import { UserContext } from "../context/userContext";

import { API } from "../config/api";
import { useHistory } from "react-router-dom";
import ExpendableText from "./ExpendableText";
import { BsBookmarkFill } from "react-icons/bs";
import draftToHtml from "draftjs-to-html";

var striptags = require("striptags");
function UserBookmarkItem({ data }) {
  let history = useHistory();

  const [show, setshow] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const handleDeleteBookmark = async (idJourney) => {
    console.log("terdelete");
    try {
      //   // e.preventDefault();

      const response = await API.delete(`/bookmark/${idJourney}`);
      // console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePushToSignUp = () => {
    history.push("/signup");
  };

  const handlePushToDetail = (id) => {
    history.push(`journey/${id}`);
  };

  return (
    <>
      <Row>
        {data?.length <= 0 && <span id="titleNotFound">Data Tidak Ada </span>}
        {data.map((item, index) => (
          <>
            <Col md={3} key={item.journey.id}>
              <Card id="styleCard" className="grow">
                <label className="block-check">
                  <Card.Img
                    variant="top"
                    src={item.journey.image}
                    style={{
                      objectFit: "cover",
                      height: "180px",
                      borderRadius: "8px",
                    }}
                    onClick={() => handlePushToDetail(item.journey.id)}
                  />
                </label>
                <Card.Body>
                  <div
                    className="card-img-overlay"
                    id="wrapBookmarkStyle"
                    onClick={() => handleDeleteBookmark(item.journey.id)}
                  >
                    <BsBookmarkFill id="bookmarkStyle" />
                  </div>

                  <Card.Title id="cardTitle">
                    <span id="titleCardList" className="inner">
                      {item.journey.title}
                    </span>
                    <span id="dateCardList" className="inner">
                      {" "}
                      {item.journey.createdAt} {item.user.fullName}{" "}
                    </span>

                    <ExpendableText maxHeight={85} id="descriptionCardList">
                      {striptags(
                        draftToHtml(JSON.parse(item.journey.description))
                      )}
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
  );
}

export default UserBookmarkItem;

import { Card, Row, Col, Container } from "react-bootstrap";
import ModalSignin from "./Modal/ModalSignin";
import { useState, useContext } from "react";

import { UserContext } from "../context/userContext";

import { API } from "../config/api";
import { useHistory } from "react-router-dom";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import ExpendableText from "./ExpendableText";
import draftToHtml from "draftjs-to-html";

var striptags = require("striptags");
function CardList(props) {
  const { data, description } = props;
  let history = useHistory();

  const [show, setshow] = useState(false);

  const [state, dispatch] = useContext(UserContext);

  const handleAddBookmark = async (idJourney) => {
    console.log("tersubmit");
    console.log(idJourney);
    try {
      //   // e.preventDefault();

      const response = await API.post(`/bookmark/${idJourney}`);
      console.log(response);
      history.push("/bookmark");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBookmark = async (idJourney) => {
    // console.log("terdelete")
    try {
      //   // e.preventDefault();

      const response = await API.delete(`/bookmark/${idJourney}`);
      // console.log(response);
      // setshow(true)
      history.push("/bookmark");
    } catch (error) {
      console.log(error);
    }
  };
  // const handlePushToSignUp = () => {
  //   history.push("/signup");
  // };

  const handlePushToDetail = (id) => {
    // console.log(id);

    history.push(`journey/${id}`);
  };

  return (
    <>
      <Container>
        <Row>
          {data?.length <= 0 && (
            <h1 className="textHeader text-danger">Data Tidak Ada </h1>
          )}
          {data.map((item, index) => (
            <>
              <Col md={3} data-div_id={item.id}>
                <Card id="styleCard" className="grow">
                  <label className="block-check">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{
                        objectFit: "cover",
                        height: "180px",
                        borderRadius: "6px",
                      }}
                      onClick={() => handlePushToDetail(item.id)}
                    />
                  </label>

                  <Card.Body>
                    {state.isLogin === true && (
                      <>
                        {item.bookmark === true ? (
                          <div
                            className="card-img-overlay"
                            id="wrapBookmarkStyle"
                            onClick={() => handleDeleteBookmark(item.id)}
                          >
                            <BsBookmarkFill
                              id="bookmarkStyle"
                              className="bookmarkStyle"
                            />
                          </div>
                        ) : (
                          <div
                            className="card-img-overlay"
                            id="wrapBookmarkStyle"
                            onClick={() => handleAddBookmark(item.id)}
                          >
                            <BsBookmark id="bookmarkStyle" />
                          </div>
                        )}
                      </>
                    )}
                    {state.isLogin !== true && (
                      <div
                        className="card-img-overlay"
                        id="wrapBookmarkStyle"
                        onClick={() => setshow(true)}
                      >
                        <BsBookmark id="bookmarkStyle" />
                      </div>
                    )}
                    <Card.Title id="cardTitle">
                      <span id="titleCardList" className="inner">
                        {item.title}{" "}
                      </span>
                      <span id="dateCardList" className="inner">
                        {" "}
                        {item.createdAt} {item.user?.fullName}{" "}
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
      </Container>
    </>
  );
}

export default CardList;

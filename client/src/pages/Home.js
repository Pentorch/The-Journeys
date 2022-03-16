import { Row, Col, Container } from "react-bootstrap";
import SearchForm from "../components/Form/SearchForm";
import CardList from "../components/CardList";
import MostBookmark from "../components/MostBookmark";

import { useState, useContext, useEffect } from "react";

import { API } from "../config/api";
import { UserContext } from "../context/userContext";

const Home = () => {
  const [state, dispatch] = useContext(UserContext);
  const [journey, setJourney] = useState([]);
  const [alljourney, setAllJourney] = useState([]);
  const [NewJourney, setNewJourney] = useState(false);
  const [search, setSearch] = useState("");

  const [searchJourney, setSearchJourney] = useState([]);
  const [NewBookmark, setNewBookmark] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  const [mostBookmark, setMostBookmark] = useState([]);

  const getMostBookmark = async () => {
    try {
      const response = await API.get("/mostbookmark");
      // Store product data to useState variabel
      setMostBookmark(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMostBookmark();
  }, [NewBookmark]);
  console.log(mostBookmark);
  const getBookmark = async () => {
    try {
      const response = await API.get("/bookmark");
      // Store product data to useState variabel
      setBookmark(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookmark();
  }, [NewBookmark]);

  const getTodayJourney = async () => {
    try {
      const response = await API.get("/todayjourney");
      // Store product data to useState variabel
      setJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayJourney();
  }, [NewJourney]);
  console.log(journey);

  const getAllJourney = async () => {
    try {
      const response = await API.get("/journeys");
      // Store product data to useState variabel
      setAllJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJourney();
  }, [NewJourney]);

  console.log(alljourney);

  const getSearchJourney = async () => {
    try {
      const response = await API.get(`/searchjourney?title=${search}`);
      // Store product data to useState variabel
      console.log(response);

      setSearchJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchJourney();
  }, [search]);

  let bookmarkIds = bookmark.map((group) => group.idJourney);

  let bookmarkMostBookmarked = mostBookmark.map((group) => ({
    ...group,
    bookmark: bookmarkIds.includes(group.idJourney),
  }));
  console.log(bookmarkMostBookmarked);

  let bookmarkAllJourney = alljourney.map((group) => ({
    ...group,
    bookmark: bookmarkIds.includes(group.id),
  }));

  let bookmarkSearchJourney = searchJourney.map((group) => ({
    ...group,
    bookmark: bookmarkIds.includes(group.id),
  }));

  let bookmarkTodayJourney = journey.map((group) => ({
    ...group,
    bookmark: bookmarkIds.includes(group.id),
  }));
  console.log("bookmarkAllJourney", bookmarkAllJourney);

  return (
    <Container>
      <Row>
        {state.isLogin === true && (
          <Col>
            <h1 className="textHeader">Journey</h1>
            <SearchForm handleSearch={setSearch} />
            {search === "" ? (
              <>
                <h1 className="textHeader">Today Journey </h1>
                <CardList data={bookmarkTodayJourney} />
                <h1 className="textHeader"> Top Bookmarked</h1>
                <MostBookmark data={bookmarkMostBookmarked} />
                <h1 className="textHeader">All Journey </h1>
                <CardList data={bookmarkAllJourney} />
              </>
            ) : (
              <>
                <h1 className="textHeader">Search Journey </h1>
                <CardList data={bookmarkSearchJourney} />
              </>
            )}
          </Col>
        )}
      </Row>

      <Row className="justify-content-md-center">
        {!state.isLogin && (
          <Col>
            {/* <Card.Img src={phuket} id="carouselImg" alt="Card image" /> */}

            <h1 className="textHeader">Journey</h1>
            <SearchForm handleSearch={setSearch} />

            {search !== "" ? (
              <>
                <h1 className="textHeader">Search Journey </h1>
                <CardList data={bookmarkSearchJourney} />
              </>
            ) : (
              <>
                <h1 className="textHeader">Today Journey </h1>
                <CardList data={bookmarkTodayJourney} />
                <h1 className="textHeader">All Journey </h1>
                <CardList data={bookmarkAllJourney} />
              </>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default Home;

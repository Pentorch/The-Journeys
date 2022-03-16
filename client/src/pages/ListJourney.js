import { useState, useContext, useEffect } from "react";

import { Row, Button, Col, Container } from "react-bootstrap";
import JourneyItem from "../components/JourneyItem";
import { API } from "../config/api";

function ListJourney(props) {
  const [journey, setUserJourney] = useState([]);
  const [NewDataJourney, setNewDataJourney] = useState(false);

  const getMyJourney = async () => {
    try {
      const response = await API.get(`/journey`);
      // Store product data to useState variabel
      setUserJourney(response.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyJourney();
  }, [NewDataJourney]);

  return (
    <Container>
      <JourneyItem data={journey} />
    </Container>
  );
}

export default ListJourney;

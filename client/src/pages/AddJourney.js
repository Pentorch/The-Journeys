import { Row, Col, Container } from "react-bootstrap";
import AddJourneyForm from "../components/Form/AddJourneyForm";

function AddJourney(props) {
  return (
    <Container>
      <Row>
        <Col>
          <AddJourneyForm />
        </Col>
      </Row>
    </Container>
  );
}

export default AddJourney;

import {
  Row,
  Col,
  Form,
  Button,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

function SearchForm(props) {
  // const [search, setSearch] = useState("");
  const { show, handleSearch } = props;

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <Container>
      <Row>
        <Col>
          <>
            <div id="wrapSearchForm">
              <Form className="d-flex mr-auto">
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    aria-describedby="search-button"
                    name="search"
                    // value={search}
                    onChange={handleChange}
                  />
                  <InputGroup.Append>
                    <Button id="search-button" size="lg">
                      <BsSearch id="btnsearch" />{" "}
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </div>
          </>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchForm;

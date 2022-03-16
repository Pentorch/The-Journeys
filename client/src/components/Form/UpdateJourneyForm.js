import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Alert,
  Image,
} from "react-bootstrap";

import { useHistory, useParams } from "react-router-dom";
import { API } from "../../config/api";

import { Editor } from "react-draft-wysiwyg";

import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { attach } from "../../assets";

function UpdateJourneyForm({ match }) {
  // const DetailJourney = ({ match }) => {
  let history = useHistory();
  let { id } = useParams();

  const [NewJourney, setNewJourney] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [message, setMessage] = useState(null);
  const [journey, setJourney] = useState({});

  const [form, setForm] = useState({
    title: journey.title,
    image: journey.image,
    description: journey.description,
  }); //Store product data
  const getJourney = async (id) => {
    try {
      const response = await API.get(`/journey/${id}`);
      // Store product data to useState variabel
      console.log(response);
      setJourney(response.data.data);
      if (response.status === 200) {
        console.log("suksess");
        const editorContent = convertFromRaw(
          JSON.parse(response.data.data.description)
        );
        setEditorState(EditorState.createWithContent(editorContent));
        setForm({
          title: response.data.data.title,
          image: response.data.data.image,
          description: response.data.data.description,
        });
        console.log(editorContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourney(id);
    console.log(journey);
  }, [NewJourney]);
  console.log(form);
  console.log(form.image);

  const handleChange = (e) => {
    const a = e.target.value;
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
    if (form.image == null) {
      const alert = (
        <Alert variant="success" className="py-1">
          Attachment Harus Di isi
        </Alert>
      );
      setMessage(alert);
    } else {
      setMessage("");
    }
  };
  const handleOnSubmit = async (e) => {
    console.log("tersubmit");
    try {
      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      // Store data with FormData as object
      const formData = new FormData();
      formData.append("image", form.image, form.image.name);
      formData.set("title", form.title);
      formData.set(
        "description",
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      );
      console.log(formData);

      const response = await API.patch(`/journey/${id}`, formData, config);
      console.log(response);
      // setshow(true)
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="textHeader">Update Journey</h1>
            <Form style={{ margin: "50px" }} onSubmit={handleOnSubmit}>
              <Form.Group>
                <Form.Control
                  name="title"
                  type="text"
                  required
                  placeholder="Title"
                  value={form.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="formInputImage mb-3 mt-3"
                controlId="ImageUpload"
              >
                <Form.Label className="d-flex justify-content-between">
                  <span style={{ color: "#8c8b8b" }}>Upload File</span>

                  <Form.Control
                    name="image"
                    type="file"
                    // required
                    hidden
                    placeholder="image"
                    onChange={handleChange}
                  />
                  <Image src={attach} style={{ width: "14px" }} />
                </Form.Label>
              </Form.Group>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{
                  outline: "1px solid gray",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
              />

              <Button
                className="button1"
                type="submit"
                style={{ width: "100%" }}
              >
                Update Journey
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateJourneyForm;

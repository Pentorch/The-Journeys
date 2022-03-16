import { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Alert,
  Image,
} from "react-bootstrap";

import { useHistory } from "react-router-dom";

import { API } from "../../config/api";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { attach } from "../../assets";

function AddJourneyForm() {
  let history = useHistory();
  const [message, setMessage] = useState(null);

  const [valueEditor, setValueEditor] = useState(EditorState.createEmpty());

  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
  }); //Store product data

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

  // console.log(form.image)
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
        JSON.stringify(convertToRaw(valueEditor.getCurrentContent()))
      );
      console.log(formData);

      const response = await API.post("/journey", formData, config);
      console.log(response);
      // setshow(true)
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(valueEditor);
  return (
    //  <p>add journey</p>
    <Container>
      <Row>
        <Col>
          <h1 className="textHeader">New Journey</h1>
          <Form style={{ margin: "50px" }} onSubmit={handleOnSubmit}>
            <Form.Group className="formGroup" controlId="title">
              <Form.Control
                name="title"
                type="text"
                required
                placeholder="Title"
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
                  required
                  placeholder="image"
                  onChange={handleChange}
                  hidden
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
              editorState={valueEditor}
              onEditorStateChange={setValueEditor}
            />
            <div id="btnAddWrap">
              <Button
                className="button1"
                type="submit"
                style={{ width: "100%" }}
              >
                Add Journey
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddJourneyForm;

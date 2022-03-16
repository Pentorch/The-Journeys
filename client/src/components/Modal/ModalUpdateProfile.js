import { Modal, Button, Alert, Form, Image } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";

import { API } from "../../config/api";
import { attach } from "../../assets";

const ModalUpdateProfile = (props) => {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const { handleClose, show } = props;
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    const a = e.target.value;
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };
  const handleUpdateImg = async (e) => {
    try {
      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const formData = new FormData();
      formData.append("image", form.image, form.image.name);
      formData.set("fullName", form.fullName);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      // formData.set("email", form.email);
      console.log(formData);
      // update data for user process
      const response = await API.patch("/user", formData, config);
      history.push("/");
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          update failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="my-modal">
      <Modal.Body>
        <Form
          onSubmit={handleUpdateImg}
          style={{ paddingLeft: "33px", paddingRight: "33px" }}
        >
          <Form.Group className="mb-3">
            {message && message}
            <h3 className="textHeader"> Update Data User</h3>
            <Form.Control
              id="formProduct"
              type="text"
              name="fullName"
              // value={data.fullName}
              onChange={handleChange}
              placeholder="fullName"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              id="formProduct"
              type="number"
              name="phone"
              // value={data.fullname}
              onChange={handleChange}
              placeholder="Phone"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              id="formProduct"
              type="text"
              as="textarea"
              name="address"
              // value={data.fullname}
              onChange={handleChange}
              placeholder="Address"
            />
          </Form.Group>

          <Form.Group
            className="formInputImage mb-3 mt-3"
            controlId="ImageUpload"
          >
            <Form.Label className="d-flex justify-content-between">
              <span style={{ color: "#8c8b8b" }}>Upload File</span>
              <Form.Control
                type="file"
                name="image"
                hidden
                required
                onChange={handleChange}
              />
              <Image src={attach} style={{ width: "14px" }} />
            </Form.Label>
          </Form.Group>
          <Button className="botton1" type="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdateProfile;

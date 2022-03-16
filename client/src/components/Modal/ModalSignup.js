import { Modal, Button, Image, Col, Form } from "react-bootstrap";

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { API } from "../../config/api";
import { atlas, leaf } from "../../assets";
import Swal from "sweetalert2";
const ModalSignin = (props) => {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const { handleClose, handleLogin, ClickHereRegister, showSignup } = props;
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const { email, password } = form;
  const handleChange = (e) => {
    // console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/register", body, config);
      console.log(response);
      // Checking process
      //   if (response?.data.status == "failed") {
      //     const alert = (
      //       <Alert variant="danger" className="py-1">
      //         email already registered!
      //       </Alert>
      //     );
      //     setMessage(alert);
      //   }
      //   if (response?.data.status == "success...") {
      //     const alert = (
      //       <Alert variant="danger" className="py-1">
      //         Success Register Please Login
      //       </Alert>
      //     );
      //     setMessage(alert);
      //   }
      // } catch (error) {
      //   // console.log(error);
      // }
      if (response?.data.status == "success...") {
        Swal.fire({
          text: "Success create account !",
          icon: "success",
          confirmButtonColor: "blue",
        }).then(handleClose);
      }
      if (response?.data.status == "failed") {
        Swal.fire({
          text: "Failed create account !",
          icon: "error",
          confirmButtonColor: "blue",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "Failed create account !",
        icon: "error",
        confirmButtonColor: "blue",
      });
      console.log(error);
    }
  };

  return (
    <Modal
      show={showSignup}
      onHide={handleClose}
      centered
      animation={false}
      size="sm"
    >
      <Modal.Body className="modal-container">
        <Image src={atlas} className="atlas" />
        <Image src={leaf} className="leaf" />
        <Form onSubmit={handleSubmit} style={{ margin: "20px" }}>
          <h2 className="text-center content-card-login">
            <b>Register</b>
          </h2>
          <Form.Group className="formGroup" controlId="formBasicFullname">
            {/* {message && message} */}
            <Form.Label className="fromLabel">
              <b>Full Name</b>
            </Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              name="fullName"
              onChange={handleChange}
              placeholder="FullName"
            />
          </Form.Group>

          <Form.Group className="formGroup" controlId="formBasicEmail">
            <Form.Label className="fromLabel">
              <b>Email</b>
            </Form.Label>
            <Form.Control
              className="formInput"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="formGroup" controlId="formBasicPassword">
            <Form.Label className="fromLabel">
              <b>Password</b>
            </Form.Label>
            <Form.Control
              className="formInput"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="formGroup" controlId="formBasicPhone">
            <Form.Label className="fromLabel">
              <b>Phone</b>
            </Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              name="phone"
              onChange={handleChange}
              placeholder="Phone"
            />
          </Form.Group>
          <Form.Group className="formGroup" controlId="formBasicAddress">
            <Form.Label className="fromLabel">
              <b>Address</b>
            </Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              as="textarea"
              name="address"
              // value={data.fullname}
              onChange={handleChange}
              placeholder="Address"
            />
          </Form.Group>
          <Button className="button1" style={{ width: "100%" }} type="submit">
            Register
          </Button>
          <Form.Label className="formLabelCenter">
            Already have an account ?
            <Form.Label onClick={ClickHereRegister}>
              {" "}
              <b>Click Here</b>
            </Form.Label>
          </Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSignin;

import { Modal, Button, Alert, Form, Image } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../config/api";
import { atlas, leaf } from "../../assets";

const ModalSignin = (props) => {
  const { handleClose, handleLogin, show, ClickHereLogin } = props;
  let history = useHistory();
  const [showSignup, setshowSignup] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  // console.log(handleClose)
  // console.log(show)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const handleChange = (e) => {
    console.log(e.target.value);
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
      const response = await API.post("/login", body, config);
      console.log(response.data.data.listAs);
      // Checking process
      console.log(response);
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.listAs == 1) {
          history.push("/");
        } else {
          history.push("/");
        }
      }
    } catch (error) {
      Swal.fire({
        text: "Login Failed !",
        icon: "error",
        confirmButtonColor: "blue",
      });
      console.log(error);
    }
  };
  // console.log(handleRegister)

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      animation={false}
      size="sm"
      className="content-login"
    >
      <Modal.Body>
        <Image src={atlas} className="atlas" />
        <Image src={leaf} className="leaf" />
        <Form onSubmit={handleSubmit} style={{ margin: "10px" }}>
          <h2 className="text-center content-card-login">
            <b>Login</b>
          </h2>
          <Form.Group className="formGroup" controlId="email">
            <Form.Label className="fromLabel">
              <b>Email address</b>
            </Form.Label>
            <Form.Control
              className="formInput"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group className="formGroup" controlId="password">
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
          <Button className="button1" style={{ width: "100%" }} type="submit">
            Submit
          </Button>
          <Form.Label className="formLabelCenter">
            Don't have an account ?
            <Form.Label onClick={ClickHereLogin}>
              <b>Click Here</b>
            </Form.Label>
          </Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSignin;

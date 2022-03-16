import { Modal, Button } from "react-bootstrap";

import { IoAlertCircleSharp } from "react-icons/io5";
const ModalDeleteJourney = (props) => {
  const { handleCloseDelete, show, setConfirm } = props;
  const handleConfirm = () => {
    setConfirm(true);
    console.log("terklik");
  };
  return (
    <Modal className="my-modal" show={show} onHide={handleCloseDelete} centered>
      <Modal.Body>
        <div id="wrapModalTransaction">
          <div style={{ fontSize: "20px", fontWeight: "900" }}>
            Delete Journey
          </div>
          <div style={{ fontSize: "16px", fontWeight: "500" }} className="mt-2">
            Are you sure you want Delete Journey ?
          </div>
          <div id="wrapIcon">
            <IoAlertCircleSharp id="styleAlartIcon" />
          </div>
          <div className="text-end mt-5">
            <Button
              onClick={handleConfirm}
              size="sm"
              className="btn-primary me-2"
              style={{ width: "135px" }}
            >
              Yes
            </Button>
            {/* <div className="me-auto"></div> */}
            <Button
              onClick={handleCloseDelete}
              size="sm"
              className="btn-danger"
              style={{ width: "135px" }}
            >
              No
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteJourney;

import { Button } from "react-bootstrap";
import noPhoto from "../assets/images/francesco.jpg";

const ProfileList = ({
  data,
  loading,
  handleModalUpdateUser,
  handleModalDetailUser,
}) => {
  if (loading) return <p>...loading</p>;
  const item = data;
  console.log(data.image);

  console.log(handleModalUpdateUser);
  return (
    // <p>asmdnsadn</p>

    <>
      {item ? (
        <>
          <div id="userProfileWrap">
            <div onClick={handleModalDetailUser}>
              {item.image === "http://localhost:5000/uploads/null" ? (
                <img src={noPhoto} id="imgProfile" />
              ) : (
                <img src={item.image} id="imgProfile" />
              )}
            </div>
            <h5 className="textHeader"> {item.fullName} </h5>
            <span id="profileEmail"> {item.email} </span>
            <span id="profileEmail"> {item.phone} </span>
            <span id="profileEmail"> {item.address} </span>
            {/* <span id="profileEmail">   {item.phone}    </span>
            <span id="profileEmail">   {item.address}    </span> */}
            <br></br>

            <Button
              className="button1"
              style={{ width: "50%" }}
              onClick={handleModalUpdateUser}
            >
              Update Profile
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProfileList;

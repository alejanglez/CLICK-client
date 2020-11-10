import React from "react";
import { Link } from "react-router-dom";
import Review from "../../components/LayoutElements/Review";
import "./Profile.css";

const Profile = (props) => {
  // const { test } = props.location.state;
  const {
    firstName,
    lastName,
    address,
    about,
    imageUrl,
    lessonType,
    serviceCat,
    facebookUrl,
    rate,
    _id,
  } = props.profileInformation;
  console.log("login props", props);
  // console.log("test", test);
  const { role, sessionUserId, sessionProviderId } = props;
  console.log("user id session", sessionUserId);
  console.log("user id ", _id);
  return (
    <div>
      <p hidden>{_id && _id}</p>
      {role === "user" && (
        <h5 className={`nav-top-${role}`}>
          {" "}
          {role.charAt(0).toUpperCase() + role.slice(1)} Profile{"    "}
          <img
            className="logo"
            src="./logouser.png"
            width="30"
            height="30"
            alt="Logo"
          />
        </h5>
      )}
      {role === "provider" && (
        <h5 className={`nav-top-${role}`}>
          {" "}
          {role.charAt(0).toUpperCase() + role.slice(1)} Profile {"    "}
          <img
            className="logo"
            src="./logoprovider.png"
            width="30"
            height="30"
            alt="Logo"
          />
        </h5>
      )}
      <div className={`profile-top-${role}`} id="top-profile">
        <div className="image-profile">
          {!imageUrl && role === "user" && (
            <img
              className="rounded img-fluid profile-image"
              src="../userAvatar.png"
            />
          )}
          {!imageUrl && role === "provider" && (
            <img
              className="rounded img-fluid profile-image"
              src="../providerAvatar.png"
            />
          )}
          <img
            className="rounded img-thumbnail img-fluid profile-image"
            src={imageUrl && imageUrl}
          />
        </div>
        <div>
          <h2>
            {firstName && firstName} {lastName && lastName}
          </h2>
          <p>Your address: {address && address}</p>
          {role === "provider" && (
            <>
              {" "}
              <p>Rate: {rate && rate}</p>{" "}
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="profile-bottom  view text-center p-3 p-md-5 m-md-3">
        <h3>About</h3>
        <p>{about && about}</p>
        {role == "provider" && (
          <>
            {" "}
            <a href={facebookUrl && facebookUrl}>Facebook</a>
            <p>Lesson Type: {lessonType && lessonType}</p>
            <p>Category: {serviceCat && serviceCat}</p>
            <p>Rate: {rate && rate}</p>{" "}
          </>
        )}

        {sessionProviderId && _id == sessionProviderId._id && (
          <>
            <Link to={`/profile/editProfile`}>Edit Profile</Link>
          </>
        )}
        {sessionUserId && _id == sessionUserId._id && (
          <>
            <Link to={`/profile/editProfile`}>Edit Profile</Link>
          </>
        )}
      </div>
      <Review
        path={`/review/list/:providerId`}
        exact
        component={Review}
        id={props.profileInformation._id}
        role={role}
      />
    </div>
  );
};

export default Profile;

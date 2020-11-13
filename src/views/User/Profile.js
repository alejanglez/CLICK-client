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
  // console.log("test", test);
  const { role, sessionUserId, sessionProviderId, spectator } = props;
  console.log("PROPPPSSS", props);
  console.log("user id session", sessionUserId);
  console.log("user id ", _id);
  return (
    <div>
      <p hidden>{_id && _id}</p>
      {/* <div className={`profile-top-${role}`} id="top-profile"> */}
      <div className={role ? `profile-top-${role}` : "profile-top-spectator"}>
        {spectator === "spectator" && (
          <h5 className={`nav-top-spectator`}>
            <p>Public Profile </p>
          </h5>
        )}

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
        <div className="profile-top-elements">
          <div className="image-profile">
            {!imageUrl && role === "user" && (
              <img
                alt="profile"
                className="rounded img-fluid profile-image"
                src="../userAvatar.png"
              />
            )}
            {!imageUrl && role === "provider" && (
              <img
                alt="profile"
                className="rounded img-fluid profile-image"
                src="../providerAvatar.png"
              />
            )}
            {imageUrl && (
              <>
                <div
                  className="profilePic"
                  style={{ backgroundImage: "url(" + imageUrl + ")" }}
                ></div>
              </>
            )}
          </div>
          <div className="name-profile">
            <div>
              <h4>
                <strong>
                  {firstName && firstName} {lastName && lastName}
                </strong>
              </h4>
            </div>
            <div>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={role === "provider" ? "white" : "#727272"}
                >
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>{" "}
                {address && address}
              </p>
              {role === "provider" && (
                <>
                  {" "}
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.947v1.053h-1v-.998c-1.035-.018-2.106-.265-3-.727l.455-1.644c.956.371 2.229.765 3.225.54 1.149-.26 1.384-1.442.114-2.011-.931-.434-3.778-.805-3.778-3.243 0-1.363 1.039-2.583 2.984-2.85v-1.067h1v1.018c.724.019 1.536.145 2.442.42l-.362 1.647c-.768-.27-1.617-.515-2.443-.465-1.489.087-1.62 1.376-.581 1.916 1.712.805 3.944 1.402 3.944 3.547.002 1.718-1.343 2.632-3 2.864z" />
                    </svg>{" "}
                    {rate && rate} €/hour
                  </p>{" "}
                  <p>
                    {lessonType && lessonType === "Online" ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M22 3.2c0-.663-.537-1.2-1.2-1.2h-17.6c-.663 0-1.2.537-1.2 1.2v11.8h20v-11.8zm-2 9.8h-16v-9h16v9zm2 3h-20c-.197.372-2 4.582-2 4.998 0 .522.418 1.002 1.002 1.002h21.996c.584 0 1.002-.48 1.002-1.002 0-.416-1.803-4.626-2-4.998zm-12.229 5l.467-1h3.523l.467 1h-4.457z" />
                        </svg>{" "}
                        Working {lessonType}
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M10.118 16.064c2.293-.529 4.428-.993 3.394-2.945-3.146-5.942-.834-9.119 2.488-9.119 3.388 0 5.644 3.299 2.488 9.119-1.065 1.964 1.149 2.427 3.394 2.945 1.986.459 2.118 1.43 2.118 3.111l-.003.825h-15.994c0-2.196-.176-3.407 2.115-3.936zm-10.116 3.936h6.001c-.028-6.542 2.995-3.697 2.995-8.901 0-2.009-1.311-3.099-2.998-3.099-2.492 0-4.226 2.383-1.866 6.839.775 1.464-.825 1.812-2.545 2.209-1.49.344-1.589 1.072-1.589 2.333l.002.619z" />
                        </svg>{" "}
                        Working {lessonType}
                      </>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-profile p-4">
        <h4>
          <strong>About me</strong>
        </h4>
        {role === "provider" && (
          <p className="category">{serviceCat && serviceCat}</p>
        )}
        <p>{about && about}</p>
        {role === "provider" && (
          <>
            <h5 className="facebook">
              <strong>Social profiles</strong>
            </h5>
            <p>
              <a href={facebookUrl && facebookUrl}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#727272"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                </svg>{" "}
              </a>
              Let's connect on Facebook!
            </p>
          </>
        )}
        <div className="text-center">
          {sessionProviderId && _id === sessionProviderId._id && (
            <>
              <Link to={`/profile/editProfile`}>
                <button className="edit-btn-provider text-center">
                  {" "}
                  Edit profile
                </button>
              </Link>
            </>
          )}
          {sessionUserId && _id === sessionUserId._id && (
            <>
              <Link className="cleanLink" to={`/profile/editProfile`}>
                <button className="edit-btn-user text-center">
                  Edit profile
                </button>
              </Link>
            </>
          )}
        </div>
        <h4 className="review-title">
          <strong>Reviews</strong>
        </h4>
      </div>

      <Review
        path={`/review/list/${_id}`}
        exact
        component={Review}
        id={props.profileInformation._id}
        role={role}
      />
    </div>
  );
};

export default Profile;

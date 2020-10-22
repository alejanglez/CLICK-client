import React from "react";

const ProfileUser = (props) => {
    const { firstName } = props.user
  return (
    <div>
      <h1>welcome {firstName && props.user.firstName}</h1>
    </div>
  );
};

export default ProfileUser;
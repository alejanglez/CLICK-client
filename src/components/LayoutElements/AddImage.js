import React from "react";
import { uploadImage } from "../../services/profileInformationService";

const AddImage = ({ addImage, role }) => {
  const handleImageUpload = (e) => {
    console.log("The file to be uploaded is", e.target.files[0]);
    console.log("The role is", role);
    uploadImage(e.target.files[0], role)
      .catch(console.error)
      .then((res) => addImage(res));
  };

  //Problem - role is not passing trough, which means I can't access the function in services

  return (
    <>
      <form>
        <input type="file" onChange={handleImageUpload} />
      </form>
    </>
  );
};

export default AddImage;

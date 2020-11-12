import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const validateSession = (accessToken, role) => {
  console.log(accessToken, role);
  return service
    .get(`/${role}/session/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const signup = (profileInformation, role) => {
  return service
    .post(`/${role}/signup`, { ...profileInformation })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err;
    });
};

export const editProfile = (profileInformation, role, id) => {
  return service
    .put(`/${role}/profile/${id}/edit`, { ...profileInformation })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const editPassword = async (oldPassword, password, role, id) => {
  const updatedPassword = {
    oldPassword,
    password,
  };
  const response = await service.put(
    `/${role}/profile/${id}/editPassword`,
    updatedPassword
  );
  return response;
};

export const login = ({ email, password }, role) => {
  return service
    .post(`/${role}/login`, { email, password })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};

export function uploadImage(image, role) {
  const uploadData = new FormData();

  uploadData.append("image", image);
  return service
    .post(`${role}/image`, uploadData)
    .then(({ data }) => data)
    .catch(console.error);
}

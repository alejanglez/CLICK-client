import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const validateSession = (accessToken, role) => {
  console.log(accessToken, role);
  return service
    .get(`/${role}/session/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => err);
};

// export const listProviders = (accessToken, role) => {
//   return service
//   .get('/providers/list')
//   .then((response)=> response.data)
//   .catch(err => err)
// }

// export const singleProvider = (providerId) => {
//   return service
//   .get(`/list/providers/${providerId}`)
//   .then((response) => response.data)
//   .catch(err => err)
// }

export const signup = (profileInformation, role) => {
  return service
    .post(`/${role}/signup`, { ...profileInformation })
    .then((response) => response.data)
    .catch((err) => err);
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

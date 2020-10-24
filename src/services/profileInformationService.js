import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const validateSession = (accessToken, role) => {
  return service
    .get(`/${role}/session/${accessToken}`)
    .then((response) => response.data)
    .catch((err) => err);
};

export const signup = ( profileInformation, role) => {
  return service
    .post(`/${role}/signup`, {...profileInformation})
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

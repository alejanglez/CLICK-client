import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getAllProviderprofile = async () => {
  const response = await service.get(`/provider/profile/list`);
  return response.data;
};

export const getSingleProviderprofile = async (providerId) => {
  const response = await service.get("/provider/profile/list/" + providerId);
  return response;
};

export const getSingleUserprofile = async (userId) => {
  const response = await service.get("/user/profile/list/" + userId);
  return response;
};

// export const filterProviderprofile = async (query) => {
//   const response = await service.get("/provider/profile/list/" + query);
//   return response.data;
// };

// export const searchProviderprofile = (searchParams) => {
//   return service
//     .get(`/provider/profile/list/${searchParams}`)
//     .then((response) => response.data)
//     .catch((err) => err);
// };

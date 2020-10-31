import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getAllProviderprofile = async () => {
  const response = await service.get(`/provider/profile/list`);
  return response.data;
};

export const getSingleProviderprofile = async (id) => {
  const response = await service.get("/provider/profile/list" + id);
  return response;
};

export const filterProviderprofile = async (query) => {
  const response = await service.get("/provider/profile/list" + query);
  return response.data;
};
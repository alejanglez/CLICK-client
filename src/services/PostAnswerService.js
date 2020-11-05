import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const createNewPost = async (comment, rating, userId, providerId) => {
  const newPost = {
    comment,
    rating,
    userId,
    providerId,
  };
  const response = await service.post("/post/create", newPost);
  return response;
};

export const getAllProviderRPost = async (providerId) => {
  const response = await service.get("/post/list/" + providerId);
  return response;
};

export const getSingleRPost = async (requestedServiceId) => {
  const response = await service.get("/requested/" + requestedServiceId);
  return response;
};

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

export const getAllProviderPost = async (providerId) => {
  const response = await service.get("/post/list/" + providerId);
  return response;
};

export const getSinglePost = async (postId) => {
  const response = await service.get("/post/" + postId);
  return response;
};

export const createNewAnswer = async (comment, rating, providerId, userId) => {
  const newAnswer = {
    comment,
    rating,
    userId,
    providerId,
  };
  const response = await service.post("/answer/create", newAnswer);
  return response;
};

export const getAllUserAnswer = async (userId) => {
  const response = await service.get("/answer/list/" + userId);
  return response;
};

export const getSingleRAnswer = async (answerId) => {
  const response = await service.get("/answer/" + answerId);
  return response;
};

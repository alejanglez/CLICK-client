import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const createNewReview = async (
  author,
  comment,
  rating,
  userId,
  providerId
) => {
  const newReview = {
    author,
    comment,
    rating,
    userId,
    providerId,
  };
  const response = await service.post("/review/create", newReview);
  return response;
};

export const getAllProviderReview = async (providerId) => {
  const response = await service.get("/review/provider/list/" + providerId);
  return response;
};

export const getAllUserReview = async (userId) => {
  const response = await service.get("/review/user/list/" + userId);
  return response;
};

export const getSingleReview = async (reviewId) => {
  const response = await service.get("/review/" + reviewId);
  return response;
};

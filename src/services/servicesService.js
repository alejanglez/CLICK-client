import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const createNewRequest = async (quantity, userId, providerId) => {
  const newRequest = {
    quantity,
    userId,
    providerId,
  };
  const response = await service.post("/requested/", newRequest);
  return response;
};

export const getAllProviderRequests = async (providerId) => {
  const response = await service.get("/requested/provider/list/" + providerId);
  return response;
};

export const getAllUserRequests = async (userId) => {
  const response = await service.get("/requested/user/list/" + userId);
  return response;
};

export const getSingleRequest = async (requestedServiceId) => {
  const response = await service.get("/requested/" + requestedServiceId);
  return response;
};

export const createNewRequestAcceptedService = async (
  quantity,
  requestedServiceId,
  serviceCat,
  lessonType,
  rate,
  firstNameProvider,
  lastNameProvider,
  imageUrlProvider,
  firstNameUser,
  lastNameUser,
  imageUrlUser,
  totalPrice
) => {
  const newRequest = {
    quantity,
    requestedServiceId,
    serviceCat,
    lessonType,
    rate,
    firstNameProvider,
    lastNameProvider,
    imageUrlProvider,
    firstNameUser,
    lastNameUser,
    imageUrlUser,
    totalPrice,
  };
  const response = await service.post("/accepted/", newRequest);
  return response;
};

export const getAllProviderAcceptedService = async (providerId) => {
  const response = await service.get("/accepted/provider/list/" + providerId);
  return response;
};

export const getAllUserAcceptedService = async (userId) => {
  const response = await service.get("/accepted/user/list/" + userId);
  return response;
};

export const getSingleAcceptedService = async (acceptedServiceId) => {
  const response = await service.get("/accepted" + acceptedServiceId);
  return response;
};

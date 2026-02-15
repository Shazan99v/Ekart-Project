import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const getCart = (userId) =>
  axios.get(`${API}/${userId}`);

export const addCart = (data) =>
  axios.post(`${API}/add`, data);

export const updateCart = (data) =>
  axios.put(`${API}/update`, data);

export const removeCart = (userId, productId) =>
  axios.delete(`${API}/${userId}/${productId}`);

import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/products";

/* GET ALL */
export const getAllProducts = () => axios.get(API_URL);

/* CREATE */
export const createProduct = (data) =>
  axios.post(API_URL, data);

/* UPDATE */
export const updateProduct = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

/* DELETE */
export const deleteProduct = (id) =>
  axios.delete(`${API_URL}/${id}`);

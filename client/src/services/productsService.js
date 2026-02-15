import axios from "axios";

/* ================= USER ROUTES ================= */
const PRODUCT_API = "http://localhost:5000/api/products";

/* ================= ADMIN ROUTES ================= */
const ADMIN_API = "http://localhost:5000/api/admin/products";

/* ================= USER ================= */

/* All products */
export const getProducts = () => axios.get(PRODUCT_API);

/* Single product */
export const getProductById = (id) =>
  axios.get(`${PRODUCT_API}/${id}`);


/* ================= ADMIN ================= */

/* Get all (admin) */
export const getAllProductsAdmin = () =>
  axios.get(ADMIN_API);

/* Create */
export const createProduct = (data) =>
  axios.post(ADMIN_API, data);

/* Update */
export const updateProduct = (id, data) =>
  axios.put(`${ADMIN_API}/${id}`, data);

/* Delete */
export const deleteProduct = (id) =>
  axios.delete(`${ADMIN_API}/${id}`);

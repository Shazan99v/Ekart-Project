import axios from "axios";

const API = "http://localhost:5000/api/address";

/* GET ADDRESS */
export const getAddress = async (token) => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* SAVE ADDRESS */
export const saveAddress = async (data, token) => {
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

import axios from 'axios';

export const getUserPostById = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/${id}`);
  return data.result;
};

export const getAllPost = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/post`);
  return data.result;
};

export const getUserPostByUserId = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/user/${id}`);
  return data.result;
};

export const getInternshipByUser = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/internship/user/${id}`);
  return data.result;
};

export const getInternshipUser = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/internship/${id}`);
  return data.result;
};

export const getWeeklyLogAPI = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/logbook/weekly/${id}`);
  return data.result;
};

export const getDailyLogAPI = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/logbook/daily/${id}`);
  return data.result;
};

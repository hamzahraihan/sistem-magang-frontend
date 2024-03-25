import axios from 'axios';
import { ACCOUNT_KEY, TOKEN } from './key';

const token = localStorage.getItem(TOKEN);
const currentUser = JSON.parse(localStorage.getItem(ACCOUNT_KEY));
console.log('🚀 ~ currentUser:', currentUser);

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
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/internship/user/${id}`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  return data.result;
};

export const getInternshipUser = async (id, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/internship/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

export const getWeeklyLogAPI = async (id, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/logbook/weekly/${id}`, { signal });
  return data.result;
};

export const getDailyLogAPI = async (id, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/logbook/daily/${id}`, { signal });
  return data.result;
};

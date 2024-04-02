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

export const getInternshipByUser = async (id, token, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/internship/user/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

export const getInternshipByIdAPI = async (id, signal, token) => {
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

export const getWeeklyLogByIdAPI = async (id, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/logbook/activity-weekly/${id}`, { signal });
  return data.result;
};

export const getReportByInternshipIdAPI = async (id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/report/internship/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

export const getReportByMahasiswaAPI = async (id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/report/mahasiswa/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

export const getReportByIdAPI = async (id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/report/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

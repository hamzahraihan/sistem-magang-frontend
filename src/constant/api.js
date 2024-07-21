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

// get request letter of internship by id
export const getRequestInternshipByIdAPI = async (letter_id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/request-internship/${letter_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get all request letter of internship
export const getRequestInternshipAPI = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/request-internship`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.result;
};

// get request letter of internship by mahasiswa id
export const getRequestInternshipByMahasiswaAPI = async (mahasiswa_id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/request-internship/mahasiswa/${mahasiswa_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get internship by user id
export const getInternshipByUser = async (user_id, mahasiswa_id, token, signal) => {
  let id;
  if (user_id) id = user_id;
  if (mahasiswa_id) id = mahasiswa_id;

  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/internship/user/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get internship by internship id
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

export const getWeeklyLogAPI = async (id, token, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/logbook/weekly/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get all log daily by logbook id
export const getDailyLogAPI = async (id, token, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/logbook/daily/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get weekly logbook data by logbook id
export const getWeeklyLogByIdAPI = async (id, token, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/logbook/detail/activity-weekly/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get all report
export const getAllReportAPI = async (token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/report`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};
// get report internship detail by internship id
export const getReportByInternshipIdAPI = async (id, token, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/report/internship/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get report internship detail by dosen id
export const getReportByDosenIdAPI = async (id, token, signal) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/report/dosen/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get all report by mahasiswa id
export const getReportByMahasiswaAPI = async (id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/report/mahasiswa/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get report detail by report id
export const getReportByIdAPI = async (id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/report/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get all mahasiswa data
export const getAllMahasiswaAPI = async (token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/mahasiswa`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get user list by dosen id
export const getMahasiswaByDosenAPI = async (id, token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/mahasiswa/dosen/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get all mahasiswa data
export const getAllDosenAPI = async (token) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/dosen`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.result;
};

// get comment user by post id
export const getCommentByPostAPI = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/comment/post/${id}`);
  return data.result;
};

// get all category data
export const getAllCategoriesAPI = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`);
  return data.result;
};

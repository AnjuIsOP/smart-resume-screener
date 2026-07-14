import axios from 'axios';

const API_BASE_URL = "https://smart-resume-screener-n8ue.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const evaluateResume = async (jobDescription, file) => {
  const formData = new FormData();
  formData.append('job_description', jobDescription);
  formData.append('file', file);

  // Added /api prefix here!
  const response = await api.post('/api/evaluate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getCandidates = async () => {
  // Added /api prefix here too!
  const response = await api.get('/api/candidates');
  return response.data;
};
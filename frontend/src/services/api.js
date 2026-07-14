import axios from 'axios';

// Ensure API_BASE_URL points directly to your Render backend:
const API_BASE_URL ="https://smart-resume-screener-n8ue.onrender.com";

// If using Axios instance:
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const evaluateResume = async (jobDescription, file) => {
  const formData = new FormData();
  formData.append('job_description', jobDescription);
  formData.append('file', file);

  const response = await api.post('/evaluate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getCandidates = async () => {
  const response = await api.get('/candidates');
  return response.data;
};
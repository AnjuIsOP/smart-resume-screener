import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

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
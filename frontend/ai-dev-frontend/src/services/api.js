import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const codeReview = (data) => API.post('code-review/', data);
export const sqlGenerator = (data) => API.post('sql-generator/', data);
export const apiGenerator = (data) => API.post('api-generator/', data);
export const bugFixer = (data) => API.post('bug-fix/', data);
export const explainCode = (data) => API.post('explain-code/', data);
export const convertCode = (data) => API.post('convert-code/', data);

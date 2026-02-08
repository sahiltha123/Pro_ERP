import axios from 'axios';

const API_Base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_URL = `${API_Base}/employees`;

export const getEmployees = () => axios.get(API_URL);
export const getEmployee = (id) => axios.get(`${API_URL}/${id}`);
export const createEmployee = (data) => axios.post(API_URL, data);
export const updateEmployee = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
export const getDashboardStats = () => axios.get(`${API_Base}/dashboard/stats`);


import axios from 'axios';

const API_URL = "http://127.0.0.1:8000"; // Replace with your backend URL
const accessToken = localStorage.getItem('accessToken');

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

// Get all users
export const getUsers = () => api.get('/users/');

// Get a single user
export const getUser = (id) => api.get(`/users/${id}/`);

// Create a new user
export const createUser = (data) => api.post('/users/', data);

// Update an existing user
export const updateUser = (id, data) => api.put(`/users/${id}/`, data);

// Delete a user
export const deleteUser = (id) => api.delete(`/users/${id}/`);

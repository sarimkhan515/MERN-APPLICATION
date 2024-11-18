import axios from 'axios';

const API_USER = 'http://localhost:5000/users';
const ALL_USER = 'http://localhost:5000/AllUsers';
const API_TODO = 'http://localhost:5000/todos';

export const createUser = async (userData) => {
    return await axios.post(API_USER, userData);
};
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_USER}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(ALL_USER);
        return response.data; 
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

export const createTodo = async (todoData) => {
    return await axios.post(API_TODO, todoData);
};

export const getTodos = async () => {
    try {
        const response = await axios.get(API_TODO);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateTodo = async (todoId, todoData) => {
    return await axios.put(`${API_TODO}/${todoId}`, todoData);
};

export const deleteTodo = async (todoId) => {
    return await axios.delete(`${API_TODO}/${todoId}`);
};
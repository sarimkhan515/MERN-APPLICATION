import React, { useState } from 'react';
import { createUser } from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        age: '',
        role: 'user',      
        status: 'active'   
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Z\s-]+$/;

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.username && !namePattern.test(formData.username)) {
            return toast.error('Invalid name. Only letters, spaces, and hyphens are allowed.');
        }
        if (formData.email && !emailPattern.test(formData.email)) {
            return toast.error('Invalid email format.');
        }
        if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
            return toast.error('Password must be at least 8 characters long and contain both letters and numbers.');
        }
        if (formData.age <= 5) {
            return toast.error('Age must be more than 5.');
        }

        try {
            await createUser(formData);
            toast.success('User created successfully!');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Email already in use');
            } else {
                toast.error('Failed to create user');
            }
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="form-group mb-3">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter username"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter age"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="role">Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="status">Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
        </div>
    );
};

export default RegisterForm;

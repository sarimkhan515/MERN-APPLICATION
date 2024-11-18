import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onFormSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const { token } = await loginUser(email, password);
            localStorage.setItem('userToken', token);
            toast.success("Logged in successfully!");
            navigate('/');
        } catch (error) {
            setIsSubmitting(false);
            if (error.response?.status === 401) {
                toast.error('Invalid email or password');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-container container mt-5">
            <h2 className="text-center">User Login</h2>
            <form onSubmit={onFormSubmit} className="login-form mt-4">
                <div className="form-group mb-3">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Pages/Profile';
import Todo from './Pages/TodoPage'; 
import UserLogin from './Pages/Login';
import UserRegister from './Pages/Register';
import ProtectedRoute from './Components/PrivateRoutes';
import Nav from './Components/Nav';

function App() {
    const authToken = localStorage.getItem('authToken');

    return (

        <BrowserRouter>
        <Nav />
            <Routes>
            
                <Route path="/login" element={!authToken ? <UserLogin /> : <Navigate to="/profile" />} />
                <Route path="/register" element={!authToken ? <UserRegister /> : <Navigate to="/profile" />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Todo />} />
                    <Route path="/users" element={<Profile />} />
                </Route>

        
                <Route path="*" element={<Navigate to={authToken ? "/profile" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

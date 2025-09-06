import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    navigate('/dashboard');
  };

  return <AuthForm title="Login" onSubmit={handleLogin} buttonText="Login" />;
};

export default Login;
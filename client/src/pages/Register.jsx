import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async ({ username, password }) => {
    await axios.post('/api/auth/register', { username, password });
    alert('Registration successful! Please log in.');
    navigate('/login');
  };

  return <AuthForm title="Register" onSubmit={handleRegister} buttonText="Register" />;
};

export default Register;
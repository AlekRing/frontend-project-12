import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import LoginForm from '../components/loginForm';

const initialValues = { username: '', password: '' };

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post('/api/v1/login', data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
      setSubmitError(error.code, error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '630px' }}>
      <LoginForm
        login={handleSubmit}
        initialValues={initialValues}
        validationSchema={loginSchema}
        submitError={submitError}
      />
    </div>
  );
};

export default Login;

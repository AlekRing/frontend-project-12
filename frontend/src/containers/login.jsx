import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import CommonForm from '../components/CommonForm';

const initialValuesInputsProps = {
  username: { type: 'text', placeholder: 'username' },
  password: { type: 'password', placeholder: 'password' },
};
const initialValues = { username: '', password: '' };

const loginSchema = Yup.object().shape({
  username: Yup.string().min(2, 'tooShort').max(50, 'tooLong').required('required'),
  password: Yup.string().min(2, 'tooShort').max(50, 'tooLong').required('required'),
});

const Login = ({ setToken }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = (data) => axios.post('/api/v1/login', data)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/');
    })
    .catch((error) => {
      console.error(error);

      if (error.response.status === 401) {
        setSubmitError(t('wrongCredentials'));
        toast.error(t('wrongCredentials'));
        return;
      }

      toast.error(t('somethingWentWrong'));
    });

  return (
    <div className="container mt-5" style={{ maxWidth: '630px' }}>
      <CommonForm
        trySubmit={handleSubmit}
        initialValues={initialValues}
        inputsProps={initialValuesInputsProps}
        validationSchema={loginSchema}
        submitError={submitError}
        submitButtonText={t('login')}
        t={t}
      />
    </div>
  );
};

export default Login;

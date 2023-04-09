import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import CommonForm from './CommonForm';
import routes from '../api/routes';
import { useAuth } from '../hooks/useAuth';

const initialValuesInputsProps = {
  username: { type: 'text', placeholder: 'username' },
  password: { type: 'password', placeholder: 'password' },
};
const initialValues = { username: '', password: '' };

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');
  const { logIn, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleSubmit = (data) => axios
      .post(routes.loginPath(), data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        logIn();
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

  const loginSchema = Yup.object().shape({
    username: Yup.string().min(2, 'tooShort').max(50, 'tooLong').required('required'),
    password: Yup.string().min(2, 'tooShort').max(50, 'tooLong').required('required'),
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
      />
    </div>
  );
};

export default Login;

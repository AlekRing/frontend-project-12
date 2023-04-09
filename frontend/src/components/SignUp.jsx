import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import CommonForm from './CommonForm';
import routes from '../api/routes';
import { useAuth } from '../hooks/useAuth';

const SignUp = () => {
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const handleSubmit = (data) => {
    const { usernameRegister, password, repeatPassword } = data;
    const readyData = {
      password,
      repeatPassword,
      username: usernameRegister,
    };

    axios
      .post(routes.signupPath(), readyData)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        logIn();
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === '409' || error.response.status === 409) {
          setSubmitError(t('userExists'));
          toast.error(t('userExists'));
          return;
        }
        setSubmitError(error.response.status, error.message);
      });
  };

  const initialValuesInputsProps = {
    usernameRegister: { type: 'text', placeholder: 'username' },
    password: { type: 'password', placeholder: 'password' },
    repeatPassword: { type: 'password', placeholder: 'repeatPassword' },
  };
  const initialValues = { usernameRegister: '', password: '', repeatPassword: '' };

  const signupSchema = Yup.object().shape({
    usernameRegister: Yup.string().trim().min(3, 'tooShortUserName').max(20, 'tooLong')
.required('required'),
    password: Yup.string().trim().min(6, 'tooShortPassword').required('required'),
    repeatPassword: Yup.string()
      .trim()
      .test('repeatPassword', 'passwordsMatch', (value, context) => value === context.parent.password),
  });

  return (
    <div className="container mt-5" style={{ maxWidth: '630px' }}>
      <CommonForm
        trySubmit={handleSubmit}
        initialValues={initialValues}
        inputsProps={initialValuesInputsProps}
        validationSchema={signupSchema}
        submitError={submitError}
        submitButtonText={t('register')}
      />
    </div>
  );
};

export default SignUp;

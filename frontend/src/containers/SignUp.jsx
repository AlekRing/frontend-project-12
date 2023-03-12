import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import CommonForm from '../components/CommonForm';

const initialValuesInputsProps = {
  username: { type: 'text', placeholder: 'username' },
  password: { type: 'password', placeholder: 'password' },
  repeatPassword: { type: 'password', placeholder: 'repeatPassword' },
};
const initialValues = { username: '', password: '', repeatPassword: '' };

const signupSchema = Yup.object().shape({
  username: Yup.string().min(3, 'tooShortUserName').max(20, 'tooLong').required('required'),
  password: Yup.string().min(6, 'tooShortPassword').max(25, 'tooLong').required('required'),
  repeatPassword: Yup.string().min(6, 'tooShortPassword').max(25, 'tooLong').required('required')
    .oneOf([Yup.ref('password'), null], 'passwordsMatch'),
});

const SignUp = ({ setToken }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = (data) => {
    axios.post('/api/v1/signup', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
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

  return (
    <div className="container mt-5" style={{ maxWidth: '630px' }}>
      <CommonForm
        trySubmit={handleSubmit}
        initialValues={initialValues}
        inputsProps={initialValuesInputsProps}
        validationSchema={signupSchema}
        submitError={submitError}
        submitButtonText={t('register')}
        t={t}
      />
    </div>
  );
};

export default SignUp;

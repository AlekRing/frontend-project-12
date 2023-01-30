import React from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = ({
  login, initialValues, validationSchema, submitError,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={login}
    validateOnBlur
    validationSchema={validationSchema}
  >
    {({
      errors,
      touched,
      handleChange,
      handleSubmit,
      isSubmitting,
      values,
    }) => (
      <Form onSubmit={handleSubmit}>
        {
          Object.keys(initialValues).map((key) => (
            <React.Fragment key={key}>
              <Form.Group className="mb-3" controlId={key}>
                <Form.Label className="text-capitalize">{key}</Form.Label>
                <Form.Control
                  type={key}
                  placeholder={key}
                  onChange={handleChange}
                  value={values[key]}
                />
                <div className="text-danger" style={{ display: errors[key] && touched[key] && errors[key] ? 'block' : 'none' }}>
                  {errors[key] && touched[key] && errors[key]}
                </div>
              </Form.Group>
              <div className="text-danger" style={{ display: submitError ? 'block' : 'none' }}>
                {submitError}
              </div>
            </React.Fragment>
          ))
        }
        <Button variant="primary" type="submit" disabled={isSubmitting} onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export default LoginForm;

import React from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CommonForm = ({
  initialValues,
  trySubmit,
  validationSchema,
  submitError,
  inputsProps,
  submitButtonText,
  children,
  t,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={trySubmit}
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
        {Object.keys(initialValues).map((key) => (
          <React.Fragment key={key}>
            <Form.Group className="mb-3" controlId={key}>
              <Form.Label>{t(key)}</Form.Label>
              <Form.Control
                type={inputsProps[key].type}
                placeholder={t(inputsProps[key].placeholder)}
                onChange={handleChange}
                value={values[key]}
                autoFocus
              />
              <div className="text-danger" style={{ display: errors[key] && touched[key] && errors[key] ? 'block' : 'none' }}>
                {errors[key] && touched[key] && t(errors[key])}
              </div>
            </Form.Group>
            <div className="text-danger" style={{ display: submitError ? 'block' : 'none' }}>
              {submitError}
            </div>
          </React.Fragment>
        ))}
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {submitButtonText || t('submit')}
        </Button>
        {children}
      </Form>
    )}
  </Formik>
);

export default CommonForm;

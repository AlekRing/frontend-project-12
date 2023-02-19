import React from 'react';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CommonForm = ({
  initialValues, trySubmit, validationSchema, submitError, inputsProps, submitButtonText,
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
              <Form.Label className="text-capitalize">{key}</Form.Label>
              <Form.Control
                type={inputsProps[key].type}
                placeholder={inputsProps[key].placeholder}
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
        ))}
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {submitButtonText || 'Submit'}
        </Button>
      </Form>
    )}
  </Formik>
);

export default CommonForm;

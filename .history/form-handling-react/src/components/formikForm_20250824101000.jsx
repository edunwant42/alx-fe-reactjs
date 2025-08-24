import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
});

function FormikForm() {
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
  setSubmitting(true);
  setTimeout(() => {
    resetForm(); // clear fields
    setStatus({ success: true, data: values }); // set status after reset
    setSubmitting(false);
  }, 500);
}}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <div style={{ marginBottom: 8 }}>
            <label>
              Username
              <Field name="username" />
            </label>
            <div style={{ color: 'red' }}>
              <ErrorMessage name="username" />
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>
              Email
              <Field name="email" />
            </label>
            <div style={{ color: 'red' }}>
              <ErrorMessage name="email" />
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>
              Password
              <Field name="password" type="password" />
            </label>
            <div style={{ color: 'red' }}>
              <ErrorMessage name="password" />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>

          {status && status.success && (
            <div style={{ marginTop: 12, padding: 8, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
              <strong>Submitted (simulated):</strong>
              <div>Username: {status.data.username}</div>
              <div>Email: {status.data.email}</div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default FormikForm;

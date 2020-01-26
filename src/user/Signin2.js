import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {signin, authenticate, isAuthenticated} from "../auth"
const Signin = () => {
  const formik = useFormik({
    initialValues: {
      email: '2aaddd@a.com',
      password: 'password6',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      const { email, password, loading, error, redirectToReferrer } = values;
      signin({email, password}).then(data => {
          if (data.error) {
          } else {
              authenticate(data, () => {
              });
          }
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
      id="email"
      name="email"
      type="email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  );
};


export default Signin;

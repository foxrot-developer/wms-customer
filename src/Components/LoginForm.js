import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TextField from '../Shared/TextField/TextField';
import { customerLogin } from '../Store/storeIndex';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validValues = {
    email: '',
    password: '',
  };

  const errorSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const loginHandler = (data) => {
    dispatch(customerLogin(data, navigate));
  };
  return (
    <Formik
      initialValues={validValues}
      validationSchema={errorSchema}
      onSubmit={loginHandler}
    >
      {(formik) => (
        <React.Fragment>
          <Form>
            <TextField label='بريد الالكتروني' name='email' type='email' />
            <TextField label='كلمة المرور' name='password' type='password' />
            <button type='submit' className='btn btn-primary'>
              إرسال
            </button>
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default LoginForm;

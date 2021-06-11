import React, { useState } from 'react';
import { Form, Field} from 'formik-antd';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { message, Spin } from 'antd';
import SignInSchema from '../ValidationSchema/SignInValidation';
import authService from '../services/authService';
import './LoginPage.scss';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleOnSubmit = async (values) => authService.login(values);

  return (
    <div className="login-container">
      <div className="form-container">
        <h1>Log In to Twitter</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            const result = await handleOnSubmit(values);
            if (result.status === 200) {
              message.success(`${result.data.message} and redirecting you to the homepage...`, 5);
              resetForm();
              history.push('/home');
            }
            if (result.status !== 200 && result.data.message) {
              message.error(result.data.message);
            }
            if (result.status !== 200 && !result.data.message) {
              message.error('Failed to login');
            }
            setIsLoading(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email" type="email" placeholder="Email" className="signup-field" />
              {errors.email && touched.email ? <div className="error-container">{errors.email}</div> : null}
              <Field name="password" type="password" placeholder="Password" className="signup-field" />
              {errors.password && touched.password ? (
                <div className="error-container">{errors.password}</div>
              ) : null}
              <button disabled={isLoading} type="submit" className="button-submit" onClick={Formik.onSubmit}>
                {isLoading ? (
                  <div>
                    <Spin />
                  </div>
                ) : (
                  <div>Log In</div>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;

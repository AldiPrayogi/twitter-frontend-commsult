import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Field, DatePicker } from 'formik-antd';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Modal, Spin, message } from 'antd';
import register from '../services/authService';
import SignupSchema from '../ValidationSchema/SignUpValidation';
import './RegisterModal.scss';

const RegisterModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  const handleOnSubmit = async (values) => register(values);

  return (
    <div className="register-modal-container">
      <Modal
        destroyOnClose
        visible={isModalOpen}
        centered
        closable={false}
        footer={null}
        className="register-modal"
        onCancel={handleOnClose}
      >
        <div className="modal-content">
          <h1>Create your account</h1>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              username: '',
              dateOfBirth: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              setIsLoading(true);
              const result = await handleOnSubmit(values);
              if (result.status !== 500) {
                message.success(`${result.data.message} and redirecting you to login form...`, 5);
                handleOnClose();
                resetForm();
                history.push('/login');
              }
              if (result.status === 500) {
                message.error(result.data.message);
              }
              setIsLoading(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="fullName" placeholder="Full Name" className="signup-field" />
                {errors.fullName && touched.fullName ? (
                  <div className="error-container">{errors.fullName}</div>
                ) : null}
                <Field name="email" type="email" placeholder="Email" className="signup-field" />
                {errors.email && touched.email ? <div className="error-container">{errors.email}</div> : null}
                <Field name="username" placeholder="Username" className="signup-field" />
                {errors.username && touched.username ? (
                  <div className="error-container">{errors.username}</div>
                ) : null}
                <Field name="password" type="password" placeholder="Password" className="signup-field" />
                {errors.password && touched.password ? (
                  <div className="error-container">{errors.password}</div>
                ) : null}
                <DatePicker name="dateOfBirth" className="signup-field" />
                {errors.dateOfBirth && touched.dateOfBirth ? (
                  <div className="error-container">{errors.dateOfBirth}</div>
                ) : null}
                <button disabled={isLoading} type="submit" className="button-submit" onClick={Formik.onSubmit}>
                  {isLoading ? (
                    <div>
                      <Spin />
                    </div>
                  ) : (
                    <div>Submit</div>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

RegisterModal.defaultProps = {
  isModalOpen: 'false',
  setIsModalOpen: PropTypes.func,
};
RegisterModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};

export default RegisterModal;

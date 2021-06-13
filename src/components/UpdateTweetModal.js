import React, { useEffect, useState } from 'react';
import {
  Modal,
  message,
  Spin,
} from 'antd';
import { Field, Form } from 'formik-antd';
import { Formik } from 'formik';
import tweetService from '../services/tweetService';
import './UpdateTweetModal.scss';
import CreateTweetSchema from '../ValidationSchema/TweetValidation';

const UpdateTweetModal = ({
  setTweetToBeUpdated, tweetToBeUpdated, isModalOpen, setIsModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweetMessage, setTweetMessage] = useState(tweetToBeUpdated.message);

  useEffect(() => {
    setTweetMessage(tweetToBeUpdated.message);
  }, [isModalOpen]);

  const handleCancel = () => {
    setTweetToBeUpdated({});
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleUpdateButton = async (tweetID, newTweetMessage) => tweetService
    .updateTweet(tweetID, newTweetMessage);

  return (
    <Modal
      visible={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      closable={false}
      afterClose={handleCancel}
      center
    >
      <div className="update-tweet-container">
        <div>
          <Formik
            enableReinitialize
            initialValues={{
              message: tweetMessage,
            }}
            validationSchema={CreateTweetSchema}
            onSubmit={async (values, { resetForm }) => {
              setIsLoading(true);
              const result = await handleUpdateButton(tweetToBeUpdated.ID, values);
              if (result.status !== 500) {
                message.success('Tweet Updated');
                resetForm();
              }
              if (result.status === 500) {
                message.error(result.data.message);
              }
              handleCancel();
            }}
          >

            {({ errors, touched }) => (
              <Form>
                <Field as="textarea" name="message" placeholder="What's happening?" type="text" className="tweet-form" />
                {errors.message && touched.message ? (
                  <div className="error-container">{errors.message}</div>
                ) : null}
                <div className="button-container-update">
                  <button disabled={isLoading} type="submit" className="button-submit" onClick={Formik.onSubmit}>
                    {isLoading ? (
                      <div>
                        <Spin />
                      </div>
                    ) : (
                      <div>Submit</div>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateTweetModal;

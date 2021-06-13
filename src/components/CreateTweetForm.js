import React, { useState } from 'react';
import { message, Spin } from 'antd';
import { Form, Field } from 'formik-antd';
import { Formik } from 'formik';
import tweetService from '../services/tweetService';
import CreateTweetSchema from '../ValidationSchema/TweetValidation';
import './CreateTweetForm.scss';

const CreateTweetForm = ({ setIsModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (values) => tweetService.createTweet(values);

  return (
    <div>
      <Formik
        initialValues={{
          message: '',
        }}
        validationSchema={CreateTweetSchema}
        onSubmit={async (values, { resetForm }) => {
          setIsModalOpen(true);
          setIsLoading(true);
          const result = await handleOnSubmit(values);
          if (result.status !== 500) {
            message.success('Tweet Created');
            setIsModalOpen(false);
            resetForm();
          }
          if (result.status === 500) {
            message.error(result.data.message);
          }
          setIsLoading(false);
        }}
      >

        {({ errors }) => (
          <Form>
            <Field as="textarea" name="message" placeholder="What's happening?" type="text" className="tweet-form" />
            <div className="button-container-create">
              <button disabled={isLoading || errors.message} type="submit" className="button-submit" onClick={Formik.onSubmit}>
                {isLoading ? (
                  <div>
                    <Spin />
                  </div>
                ) : (
                  <div>Tweet</div>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTweetForm;

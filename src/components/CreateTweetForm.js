import React, { useState } from 'react';
import { message, Spin } from 'antd';
import { Form, Field } from 'formik-antd';
import { Formik } from 'formik';
import tweetService from '../services/tweetService';
import CreateTweetSchema from '../ValidationSchema/TweetValidation';
import './CreateTweetForm.scss';

const CreateTweetForm = ({ setTweets }) => {
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
          setIsLoading(true);
          const result = await handleOnSubmit(values);
          if (result.status !== 500) {
            const fetchedTweetsResponse = await tweetService.getAllTweets();
            if (fetchedTweetsResponse.data.length !== 0) {
              const fetchedTweets = fetchedTweetsResponse.data;
              setTweets(fetchedTweets);
              message.success('Tweet Created');
            }
            resetForm();
          }
          if (result.status === 500) {
            message.error(result.data.message);
          }
          setIsLoading(false);
        }}
      >

        {({ errors, touched }) => (
          <Form>
            <Field as="textarea" name="message" placeholder="What's happening?" type="text" className="tweet-form" />
            <div className="button-container-create">
              <button disabled={isLoading || errors.message || touched} type="submit" className="button-submit" onClick={Formik.onSubmit}>
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
  );
};

export default CreateTweetForm;

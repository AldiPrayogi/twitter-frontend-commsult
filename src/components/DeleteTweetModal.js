import React, { useState } from 'react';
import {
  Modal,
  message,
  Button,
  Space,
  Spin,
} from 'antd';
import tweetService from '../services/tweetService';
import './DeleteTweetModal.scss';

const DeleteTweetModal = ({
  setTweet,
  tweet,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleCancel = () => {
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleOKButton = async (deletedTweet) => {
    setIsLoading(true);
    const response = await tweetService.deleteTweets(deletedTweet.ID);
    if (response.status !== 200) {
      message.info('Failed to delete tweet');
    }
    if (response.status === 200) {
      const fetchedTweetsResponse = await tweetService.getAllTweets();
      const fetchedTweets = fetchedTweetsResponse.data;
      setTweet(fetchedTweets);
      message.success('Tweet Deleted');
    }
    handleCancel();
  };

  return (
    <Modal visible={isModalOpen} footer={null} onCancel={handleCancel} closable={false}>
      <div className="delete-tweet-confirmation">
        <h3>Delete Tweet?</h3>
        <p>
          This can’t be undone and it
          will be removed from your profile,
          the timeline of any accounts that follow you,
          and from Twitter search results.
        </p>
        <div className="delete-tweet-confirmation-button-container">
          <Space>
            <Button type="primary" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
            <Button type="primary" danger onClick={() => handleOKButton(tweet)} disabled={isLoading}>
              {
                isLoading
                  ? <Spin />
                  : <div>Delete</div>
              }
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTweetModal;

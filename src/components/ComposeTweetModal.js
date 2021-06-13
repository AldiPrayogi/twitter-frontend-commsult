import React from 'react';
import {
  Modal,
} from 'antd';
import CreateTweetForm from './CreateTweetForm';
import './UpdateTweetModal.scss';

const ComposeTweetModal = ({ setTweets, isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <CreateTweetForm
          setTweets={setTweets}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </Modal>
  );
};

export default ComposeTweetModal;

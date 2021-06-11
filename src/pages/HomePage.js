import React, { useState, useEffect } from 'react';
import {
  Layout,
} from 'antd';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';
import './HomePage.scss';
import tweetService from '../services/tweetService';

const {
  Sider, Content,
} = Layout;

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const history = useHistory();

  const verifyToken = async () => {
    const isVerified = await authService.verify();
    if (isVerified.status !== 200) {
      history.push('/login');
      localStorage.clear();
    }
  };

  const getTweets = async () => {
    const fetchedTweetsResponse = await tweetService.getAllTweets();
    if (fetchedTweetsResponse.data.length !== 0) {
      const fetchedTweets = fetchedTweetsResponse.data;
      setTweets(fetchedTweets);
    }
  };

  useEffect(() => {
    (async () => {
      await verifyToken();
      await getTweets();
    })();
  }, []);

  return (
    <div className="landing-page">
      <Layout>
        <Sider className="left-sider">
          <div>
            <p>
              Left Sides
            </p>
          </div>
        </Sider>
        <Content>
          {
            tweets.length === 0 ? (
              <div>
                <h1>EMPTY</h1>
              </div>
            )
              : tweets.map((tweet) => (
                <div>
                  <p>
                    {tweet.message}
                  </p>
                </div>
              ))
          }
        </Content>
        <Sider>
          <div>
            <p>
              Right Sides
            </p>
          </div>
        </Sider>
      </Layout>
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import {
  TwitterOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined,
  BorderlessTableOutlined,
  EllipsisOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Avatar from 'react-avatar';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';
import './HomePage.scss';
import tweetService from '../services/tweetService';

const {
  Sider, Content,
} = Layout;

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});
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
      const rawUserData = localStorage.getItem('userData');
      const userData = JSON.parse(rawUserData);
      setUser(userData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="landing-page">
      <Layout>
        <Sider className="left-sider">
          <div className="icon-container">
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
              <Menu.Item key="1" icon={<TwitterOutlined />} className="twitter-logo" />
              <Menu.Item key="2" icon={<HomeOutlined />}>
                <div className="icon-name">
                  <h4>Home</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="3" icon={<BorderlessTableOutlined />}>
                <div className="icon-name">
                  <h4>Explore</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="4" icon={<BellOutlined />}>
                <div className="icon-name">
                  <h4>Notifications</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="5" icon={<MailOutlined />}>
                <div className="icon-name">
                  <h4>Message</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="6" icon={<UserOutlined />}>
                <div className="icon-name">
                  <h4 className="icon-name">Profile</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="7" icon={<EllipsisOutlined />}>
                <div className="icon-name">
                  <h4>More</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="8" icon={<Avatar name={user.username} round size={30} textSizeRatio={2} color="#FFFFFF" fgColor="#000000" />}>
                <div className="icon-name">
                  <h4>{ user.username }</h4>
                </div>
              </Menu.Item>
            </Menu>
          </div>
        </Sider>
        <Content className="content-container">
          <div className="tweet-form-container">
            <p>Create Tweet</p>
          </div>
          <div className="tweet-container">
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
          </div>
        </Content>
        <Sider className="right-sider">
          <div className="icon-container">
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
              <Menu.Item key="1" icon={<TwitterOutlined />} className="twitter-logo" />
              <Menu.Item key="2" icon={<HomeOutlined />}>
                <div className="icon-name">
                  <h4>Home</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="3" icon={<BorderlessTableOutlined />}>
                <div className="icon-name">
                  <h4>Explore</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="4" icon={<BellOutlined />}>
                <div className="icon-name">
                  <h4>Notifications</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="5" icon={<MailOutlined />}>
                <div className="icon-name">
                  <h4>Message</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="6" icon={<UserOutlined />}>
                <div className="icon-name">
                  <h4 className="icon-name">Profile</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="7" icon={<EllipsisOutlined />}>
                <div className="icon-name">
                  <h4>More</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="8" icon={<Avatar name={user.username} round size={30} textSizeRatio={2} color="#FFFFFF" fgColor="#000000" />}>
                <div className="icon-name">
                  <h4>{ user.username }</h4>
                </div>
              </Menu.Item>
            </Menu>
          </div>
        </Sider>
      </Layout>
    </div>
  );
};

export default HomePage;

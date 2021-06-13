import React, { useState, useEffect } from 'react';
import {
  Popover,
  Menu,
  Button,
  Row,
  Col,
  Card, Space,
} from 'antd';
import {
  TwitterOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined,
  BorderlessTableOutlined,
  EllipsisOutlined,
  HomeOutlined,
  EditOutlined,
} from '@ant-design/icons';
import Avatar from 'react-avatar';
import { useHistory } from 'react-router-dom';
import CreateTweetForm from '../components/CreateTweetForm';
import authService from '../services/authService';
import './HomePage.scss';
import tweetService from '../services/tweetService';
import DeleteTweetModal from '../components/DeleteTweetModal';
import UpdateTweetModal from '../components/UpdateTweetModal';

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState('');
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tweetToBeUpdated, setTweetToBeUpdated] = useState({});
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

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.status === 200) {
      setUser([]);
      localStorage.clear();
      history.push('/');
    }
  };

  const handleUpdateButtonClicked = (tweet) => {
    setTweetToBeUpdated(tweet);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteButtonClicked = () => {
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    (async () => {
      await getTweets();
    })();
  }, [iseDeleteModalOpen === false, isUpdateModalOpen === false]);

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
      <Row>
        <Col className="left-sider" span={9}>
          <div className="icon-container">
            <Menu mode="inline" defaultSelectedKeys={['2']}>
              <Menu.Item key="1" icon={<TwitterOutlined className="sidebar-icon" />} className="twitter-logo" />
              <Menu.Item key="2" icon={<HomeOutlined className="sidebar-icon" />} className="menu-item">
                <div className="icon-name">
                  <h4>Home</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="3" icon={<BorderlessTableOutlined className="sidebar-icon" />} className="menu-item">
                <div className="icon-name">
                  <h4>Explore</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="4" icon={<BellOutlined className="sidebar-icon" />} className="menu-item">
                <div className="icon-name">
                  <h4>Notifications</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="5" icon={<MailOutlined className="sidebar-icon" />} className="menu-item">
                <div className="icon-name">
                  <h4>Message</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="6" icon={<UserOutlined className="sidebar-icon" />} className="menu-item">
                <div className="icon-name">
                  <h4 className="icon-name">Profile</h4>
                </div>
              </Menu.Item>
              <Menu.Item key="7" icon={<EllipsisOutlined className="sidebar-icon" />} className="menu-item">
                <div className="icon-name">
                  <h4>More</h4>
                </div>
              </Menu.Item>
              <div className="button-container">
                <Button type="primary" size="large">
                  <EditOutlined />
                </Button>
              </div>
              <Popover
                content={(
                  <div className="logout-container">
                    <div className="info-logout-container">
                      <Avatar name={user.fullName} round size={40} textSizeRatio={1} color="#FFFFFF" fgColor="#000000" />
                      <p className="username-info">{ `@${user.username}` }</p>
                    </div>
                    <Button type="primary" onClick={handleLogout}>
                      Logout @
                      {user.username}
                    </Button>
                  </div>
                )}
                trigger="click"
              >
                <Menu.Item key="8" icon={<Avatar name={user.fullName} round size={30} textSizeRatio={1} color="#FFFFFF" fgColor="#000000" />} className="avatar-container">
                  <div className="user-name">
                    <h3>{ user.username }</h3>
                  </div>
                </Menu.Item>
              </Popover>
            </Menu>
          </div>
        </Col>
        <Col className="content-container" span={6}>
          <div className="tweet-form-container-header">
            <h5 className="tweet-form-container-header-text">LATEST TWEET</h5>
          </div>
          <div className="tweet-form-container">
            <div className="create-tweet-container">
              <CreateTweetForm setTweets={setTweets} />
            </div>
          </div>
          <div className="tweet-container">
            {
              tweets.length === 0
                ? (
                  <div>
                    <h1>EMPTY</h1>
                  </div>
                )
                : tweets.map((tweet) => (
                  <div>
                    <Card className="card-tweets">
                      <div className="card-tweet-information">
                        <Row>
                          <Col span={2} className="card-tweet-information-avatar">
                            <Avatar name={tweet.User.fullName} round size={40} textSizeRatio={1} color="#FFFFFF" fgColor="#000000" />
                          </Col>
                          <Col span={20} className="card-tweet-information-data">
                            <div className="card-tweet-information-data-users">
                              <Space>
                                <p>
                                  {tweet.User.fullName}
                                </p>
                                <p className="username">
                                  {`@${tweet.User.username}`}
                                </p>
                              </Space>
                            </div>
                            <p>
                              {tweet.message}
                            </p>
                          </Col>
                          <Col span={1} className="card-tweet-information-avatar">
                            <div>
                              {
                                tweet.User.username === user.username
                                  ? (
                                    <Popover
                                      content={(
                                        <div className="tweet-action-container">
                                          <Menu theme="dark">
                                            <Menu.Item key="1" onClick={() => handleUpdateButtonClicked(tweet)}><p>Update</p></Menu.Item>
                                            <Menu.Item key="2" onClick={handleDeleteButtonClicked}><p>Delete</p></Menu.Item>
                                          </Menu>
                                          <UpdateTweetModal
                                            setTweetToBeUpdated={setTweetToBeUpdated}
                                            tweetToBeUpdated={tweetToBeUpdated}
                                            isModalOpen={isUpdateModalOpen}
                                            setIsModalOpen={setIsUpdateModalOpen}
                                          />
                                          <DeleteTweetModal
                                            tweet={tweet}
                                            isModalOpen={iseDeleteModalOpen}
                                            setIsModalOpen={setIsDeleteModalOpen}
                                          />
                                        </div>
                                      )}
                                      trigger="hover"
                                    >
                                      <div>
                                        <EllipsisOutlined />
                                      </div>
                                    </Popover>
                                  )
                                  : <div />
                              }
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </div>
                ))
            }
          </div>
        </Col>
        <Col className="right-sider" span={9}>
          <p>abc</p>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;

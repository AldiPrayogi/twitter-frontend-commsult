import React, { useState, useEffect } from 'react';
import {
  Popover,
  Menu,
  Button,
  Row,
  Col,
  Card,
  Space,
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
  CloseOutlined,
} from '@ant-design/icons';
import Avatar from 'react-avatar';
import Search from 'antd/es/input/Search';
import { useHistory } from 'react-router-dom';
import CreateTweetForm from '../components/CreateTweetForm';
import authService from '../services/authService';
import './HomePage.scss';
import tweetService from '../services/tweetService';
import DeleteTweetModal from '../components/DeleteTweetModal';
import UpdateTweetModal from '../components/UpdateTweetModal';
import ComposeTweetModal from '../components/ComposeTweetModal';

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState('');
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isComposeTweetModalOpen, setIsComposeTweetModalOpen] = useState(false);
  const [tweetToBeUpdated, setTweetToBeUpdated] = useState({});
  const [tweetToBeDeleted, setTweetToBeDeleted] = useState('create');

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

  const handleComposeTweetButtonClicked = () => {
    setIsComposeTweetModalOpen(true);
  };

  const handleDeleteButtonClicked = (tweet) => {
    setTweetToBeDeleted(tweet);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    (async () => {
      await getTweets();
    })();
  }, [
    iseDeleteModalOpen === false,
    isComposeTweetModalOpen === false,
    isUpdateModalOpen === false,
    isButtonClicked === false,
  ]);

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
                <Button type="primary" size="large" onClick={handleComposeTweetButtonClicked}>
                  <EditOutlined />
                  <ComposeTweetModal
                    setTweets={setTweets}
                    isModalOpen={isComposeTweetModalOpen}
                    setIsModalOpen={setIsComposeTweetModalOpen}
                  />
                </Button>
              </div>
              <Popover
                content={(
                  <div className="logout-container">
                    <div className="info-logout-container">
                      <Row>
                        <Col className="username-avatar" span={8}>
                          <Avatar name={user.fullName} round size={40} textSizeRatio={1} color="#FFFFFF" fgColor="#000000" />
                        </Col>
                        <Col className="username-info" span={16}>
                          <h4>{user.fullName}</h4>
                          <p>{ `@${user.username}` }</p>
                        </Col>
                      </Row>
                    </div>
                    <Menu>
                      <Menu.Item onClick={handleLogout} className="logout-button">
                        Logout @
                        {user.username}
                      </Menu.Item>
                    </Menu>
                  </div>
                )}
                trigger="click"
              >
                <Menu.Item key="8" icon={<Avatar name={user.fullName} round size={30} textSizeRatio={1} color="#FFFFFF" fgColor="#000000" />} className="avatar-container">
                  <div className="user-name">
                    <p>{ user.fullName }</p>
                    <p className="username">{ `@${user.username}` }</p>
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
              <CreateTweetForm setIsModalOpen={setIsButtonClicked} />
            </div>
          </div>
          <div className="tweet-container">
            {
              tweets.length === 0
                ? (
                  <div>
                    <Card title="Start Tweeting!" className="card-empty">
                      <h2>No Tweets Found!</h2>
                    </Card>
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
                          <Col span={1} className="card-tweet-information-action">
                            <div>
                              {
                                tweet.User.username === user.username
                                  ? (
                                    <Popover
                                      content={(
                                        <div className="tweet-action-container">
                                          <Menu theme="dark">
                                            <Menu.Item key="1" onClick={() => handleUpdateButtonClicked(tweet)}><p>Update</p></Menu.Item>
                                            <Menu.Item key="2" onClick={() => handleDeleteButtonClicked(tweet)}><p>Delete</p></Menu.Item>
                                          </Menu>
                                          <UpdateTweetModal
                                            setTweetToBeUpdated={setTweetToBeUpdated}
                                            tweetToBeUpdated={tweetToBeUpdated}
                                            isModalOpen={isUpdateModalOpen}
                                            setIsModalOpen={setIsUpdateModalOpen}
                                            setTweets={setTweets}
                                          />
                                          <DeleteTweetModal
                                            setTweet={setTweets}
                                            tweet={tweetToBeDeleted}
                                            isModalOpen={iseDeleteModalOpen}
                                            setIsModalOpen={setIsDeleteModalOpen}
                                          />
                                        </div>
                                      )}
                                      trigger="hover"
                                    >
                                      <div className="card-tweet-information-action-icon">
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
          <div className="right-sider">
            <Space direction="vertical">
              <div className="right-sider-search">
                <Search placeholder="Search Twitter" className="right-sider-search-input" />
              </div>
              <div className="right-sider-trends">
                <Card title="Trends for you" bordered={false}>
                  <div className="right-sider-trends-container">
                    <Row>
                      <Col span={22}>
                        <div className="right-sider-trends-information">
                          <h5>Trending in Indonesia</h5>
                          <h4>Gustika</h4>
                          <h5>20k Tweets</h5>
                        </div>
                      </Col>
                      <Col span={2}>
                        <div className="right-sider-trends-button">
                          <Space direction="horizontal">
                            <EllipsisOutlined />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="right-sider-trends-container">
                    <Row>
                      <Col span={22}>
                        <div className="right-sider-trends-information">
                          <h5>Trending in Indonesia</h5>
                          <h4>Mola</h4>
                          <h5>24.2k Tweets</h5>
                        </div>
                      </Col>
                      <Col span={2}>
                        <div className="right-sider-trends-button">
                          <Space direction="horizontal">
                            <EllipsisOutlined />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="right-sider-trends-container">
                    <Row>
                      <Col span={22}>
                        <div className="right-sider-trends-information">
                          <h5>Sports . Trending</h5>
                          <h4>Harry Kane</h4>
                          <h5>50k Tweets</h5>
                        </div>
                      </Col>
                      <Col span={2}>
                        <div className="right-sider-trends-more">
                          <Space direction="horizontal">
                            <EllipsisOutlined />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="right-sider-trends-container">
                    <Row>
                      <Col span={22}>
                        <div className="right-sider-trends-information">
                          <h5>Entertainment . Film</h5>
                          <h4>The Witcher Season 2</h4>
                          <h5>100k Tweets</h5>
                        </div>
                      </Col>
                      <Col span={2}>
                        <div className="right-sider-trends-button">
                          <Space direction="horizontal">
                            <EllipsisOutlined />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </div>
              <div className="right-sider-topics">
                <Card title="Topics to follow" bordered={false}>
                  <div className="right-sider-topics-container">
                    <Row>
                      <Col span={16}>
                        <div className="right-sider-topics-information">
                          <h3>Horizon Zero Dawn</h3>
                          <h4>Video Games</h4>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="right-sider-topics-button">
                          <Space direction="horizontal">
                            <Button type="primary">Follow</Button>
                            <CloseOutlined />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="right-sider-topics-container">
                    <Row>
                      <Col span={16}>
                        <div className="right-sider-topics-information">
                          <h3>Romelu Lukaku</h3>
                          <h4>Soccer Player</h4>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="right-sider-topics-button">
                          <Space direction="horizontal">
                            <Button type="primary">Follow</Button>
                            <CloseOutlined />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="right-sider-topics-container">
                    <Row>
                      <Col span={16}>
                        <div className="right-sider-topics-information">
                          <h3>Muse</h3>
                          <h4>Music Band</h4>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="right-sider-topics-button">
                          <Space direction="horizontal">
                            <Button type="primary">Follow</Button>
                            <CloseOutlined />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="right-sider-topics-container">
                    <Row>
                      <Col span={16}>
                        <div className="right-sider-topics-information">
                          <h3>Linus Tech Tips</h3>
                          <h4>Tech Reviewer</h4>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="right-sider-topics-button">
                          <Space direction="horizontal">
                            <Button type="primary">Follow</Button>
                            <CloseOutlined />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;

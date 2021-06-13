import React, { useState, useEffect } from 'react';
import {
  Button, Layout, Row, Col,
} from 'antd';
import { TwitterOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal';
import authService from '../services/authService';
import './LandingPage.scss';

const LandingPage = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [user, setUser] = useState([]);
  const history = useHistory();
  const {
    Sider, Content,
  } = Layout;

  const verifyToken = async () => {
    const isVerified = await authService.verify();
    if (isVerified.status !== 200) {
      localStorage.clear();
    }
    if (isVerified.status === 200) {
      history.push('/home');
    }
  };

  const onSubmitRegister = () => {
    setIsSignUpModalOpen(true);
  };
  const onSubmitLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    (async () => {
      await verifyToken();
      const rawUserData = localStorage.getItem('userData');
      const userData = JSON.parse(rawUserData);
      setUser(userData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="landing-page">
      <Row className="row-container">
        <Layout className="layout-container">
          <Col span={14} className="sides-container">
            <Sider />
          </Col>
          <Col span={10} className="content-container">
            <Content>
              <div>
                <div className="twitter-logo-container">
                  <TwitterOutlined size={3000} color="#FFFFFF" fgColor="#000000" className="twitter-logo" />
                </div>
                <h2>Happening now</h2>
                <h4>Join Twitter today.</h4>
              </div>
              <div className="button-container">
                <Button type="primary" className="button-register" onClick={onSubmitRegister}>
                  Sign Up
                </Button>
                <RegisterModal
                  isModalOpen={isSignUpModalOpen}
                  setIsModalOpen={setIsSignUpModalOpen}
                />
                <Button className="button-login" onClick={onSubmitLogin}>
                  Log in
                </Button>
              </div>
            </Content>
          </Col>
        </Layout>
      </Row>
    </div>
  );
};

export default LandingPage;

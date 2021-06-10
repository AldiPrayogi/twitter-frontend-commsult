import React, { useState } from 'react';
import {
  Button, Layout, Row, Col,
} from 'antd';
import { useHistory } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal';
import './Homepage.scss';

const Homepage = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const history = useHistory();
  const {
    Sider, Content,
  } = Layout;

  const onSubmitRegister = () => {
    setIsSignUpModalOpen(true);
  };
  const onSubmitLogin = () => {
    history.push('/login');
  };

  return (
    <div className="homepage">
      <Row className="row-container">
        <Layout className="layout-container">
          <Col span={14} className="sides-container">
            <Sider />
          </Col>
          <Col span={10} className="content-container">
            <Content>
              <div>
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

export default Homepage;

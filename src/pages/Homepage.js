import React from "react";
import { Button, Layout, Row, Col, Space } from "antd";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();
  const { Header, Footer, Sider, Content } = Layout;

  const onSubmitRegister = () => {
    history.push("/register");
  };
  const onSubmitLogin = () => {
    history.push("/login");
  };

  return (
    <div>
      <Layout>
        <Row>
          <Col span={14}>
            <Sider>Sides</Sider>
          </Col>
          <Col span={10}>
            <Content>
              <Button type="primary" onClick={onSubmitLogin}>
                Login
              </Button>
              <Button onClick={onSubmitRegister}>Register</Button>
            </Content>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Homepage;

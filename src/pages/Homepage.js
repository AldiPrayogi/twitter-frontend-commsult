import React from "react";
import { Button, Layout } from "antd";
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
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sides</Sider>
        <Content>
          <Button type="primary" onClick={onSubmitLogin}>
            Login
          </Button>
          <Button onClick={onSubmitRegister}>Register</Button>
        </Content>
      </Layout>
      <Footer>Foot</Footer>
    </Layout>
  );
};

export default Homepage;

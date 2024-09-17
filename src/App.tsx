import { Layout, Col, Row } from 'antd';
import AppBar from "./components/AppBar";
import PostContainer from "./components/PostContainer/PostContainer";
import FooterContainer from "./components/FooterContainer";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <AppBar />
      </Header>
      <Layout>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Row justify="center">
            <Col xs={24} sm={22} md={18} lg={16} xl={14}>
              <PostContainer />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <FooterContainer />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;

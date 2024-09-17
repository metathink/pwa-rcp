import React from 'react';
import { Layout, Menu, Input, Card } from 'antd';

const { Search } = Input;

const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: 'Title' },
  { key: '2', label: 'Tags' },
  { key: '3', label: 'Item' },
];

const onSearch = () => {

}

const App: React.FC = () => {

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200, marginRight: "20px" }} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 20px' }}>
        <Card title="Card title"
          bordered={false}
          style={{ width: "100%", margin: '20px auto' }}>
          <p>Card content</p>
        </Card>
        <Card title="Card title"
          bordered={false}
          style={{ width: "100%", margin: '20px auto' }}>
          <p>Card content</p>
        </Card>
        <Card title="Card title"
          bordered={false}
          style={{ width: "100%", margin: '20px auto' }}>
          <p>Card content</p>
        </Card>
        <Card title="Card title"
          bordered={false}
          style={{ width: "100%", margin: '20px auto' }}>
          <p>Card content</p>
        </Card>
        <Card title="Card title"
          bordered={false}
          style={{ width: "100%", margin: '20px auto' }}>
          <p>Card content</p>
        </Card>
        <Card title="Card title"
          bordered={false}
          style={{ width: "100%", margin: '20px auto' }}>
          <p>Card content</p>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
      </Footer>
    </Layout>
  );
};

export default App;
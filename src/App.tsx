import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
      </Footer>
    </Layout>
  );
};

export default App;
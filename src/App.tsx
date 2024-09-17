import React from 'react';
import { Layout, Menu, Input, Card } from 'antd';

const { Search } = Input;

const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: 'Title' },
  { key: '2', label: 'Tags' },
  { key: '3', label: 'Item' },
];

const cardTestData = [
  { title: "title1", content: "content1" },
  { title: "title2", content: "content2" },
  { title: "title3", content: "content3" },
  { title: "title4", content: "content4" },
  { title: "title5", content: "content5" },
  { title: "title6", content: "content6" },
  { title: "title7", content: "content7" },
  { title: "title8", content: "content8" },
  { title: "title9", content: "content9" },
  { title: "title10", content: "content10" },
]

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
        {cardTestData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            bordered={false}
            style={{ width: "100%", margin: '20px auto' }}
          >
            <p>{card.content}</p>
          </Card>
        ))}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
      </Footer>
    </Layout>
  );
};

export default App;
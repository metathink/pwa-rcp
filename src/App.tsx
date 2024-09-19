import React, { useEffect, useState } from 'react';
import { Layout, Input, Card, } from 'antd';
import PostDetail from './components/PostDetail';

import { Post } from './types/types';
import { getPostAll } from './util/db';
import { PlusOutlined } from '@ant-design/icons';
import PostCreate from './components/PostCreate';

const { Search } = Input;
const { Header, Content, Footer } = Layout;


const onSearch = (setView: React.Dispatch<React.SetStateAction<string>>) => {
  setView("list")
}

const logoClick = (setView: React.Dispatch<React.SetStateAction<string>>) => {
  setView("list")
}

const HeaderContainer = ({ setView }: {
  setView: React.Dispatch<React.SetStateAction<string>>,
}) => {

  const onPlusClick = () => {
    setView("create")
  }

  return (
    <>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
          <img
            src="logo.png"
            alt="Logo"
            style={{ height: '80%', maxHeight: '60px', marginRight: '10px', borderRadius: '10px' }} // 画像の最大高さをヘッダーの高さに合わせる
            onClick={() => logoClick(setView)}
          />
          <Search
            placeholder="input search title or item"
            onSearch={() => onSearch(setView)}
            style={{ width: 200, marginRight: '20px' }}
          />
        </div>
        <PlusOutlined
          style={{ color: 'white', fontSize: '24px' }}
          onClick={onPlusClick}
        />
      </Header>

    </>
  )
}

const PostListView = ({ setView, posts }:
  { setView: React.Dispatch<React.SetStateAction<string>>, posts: Post[] }) => {

  const onCardClick = () => {
    console.log("card click")
    setView("detail")
  }

  if (posts.length > 0) {
    return (
      <>
        <Content style={{ padding: '10px', margin: "10px" }}>
          {posts.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              bordered={false}
              style={{ width: "100%", margin: '20px auto' }}
              onClick={() => onCardClick()}
            >
              <p>{card.description}</p>
            </Card>
          ))}
        </Content>
      </>
    )
  }

  return (
    <Content style={{ padding: '10px', margin: "10px", textAlign: "center" }}>
      no post
    </Content>
  )
}

const PostContainer = ({ view, setView, posts }: {
  view: string,
  setView: React.Dispatch<React.SetStateAction<string>>,
  posts: Post[]
}) => {

  switch (view) {
    case "list":
      return (
        <Content style={{ padding: '20px', margin: '20px' }}> {/* Adjust the margin as needed */}
          <PostListView setView={setView} posts={posts} />
        </Content>
      )
    case "detail":
      return (
        <PostDetail view={view} />
      )
    case "create":
      return (
        <PostCreate />
      )
  }
}

const FooterContainer = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
    </Footer>
  )
}


const App: React.FC = () => {

  const [view, setView] = useState("list")
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    try {
      const allPosts = await getPostAll()
      setPosts(allPosts)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <Layout>
      <HeaderContainer
        setView={setView} />
      <PostContainer
        view={view}
        setView={setView}
        posts={posts}
      />
      <FooterContainer />
    </Layout>
  );
};

export default App;
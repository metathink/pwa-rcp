import React, { useEffect, useState } from 'react';
import { Col, Layout, Row } from 'antd';

import { Post } from './types/types';
import { getPostAll } from './util/db';
import HeaderContainer from './components/Home/Header';
import FooterContainer from './components/Home/Footer';
import PostContainer from './components/Post/PostContainer';


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
    <Layout style={{ width: "100%", minHeight: '100vh' }} >
      <Row>
        <Col span={24}>
          <HeaderContainer
            setView={setView} />
          <PostContainer
            view={view}
            setView={setView}
            posts={posts}
          />
        </Col>
      </Row>

      <FooterContainer />
    </Layout >
  );
};

export default App;
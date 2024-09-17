import styled from "styled-components";

const Container = styled.div`
  background: #f5f5f5; /* カード以外の領域の背景色 */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px;
  margin: 5px;
  width: 95%;
  height: auto; /* 高さはコンテンツに応じて調整 */

  display: flex;
  flex-direction: column; /* 縦に並べる */
  align-items: flex-start; /* 左揃え */
`;

const Card = styled.div`
  display: flex;
  margin: 10px 0; /* 縦に10pxのマージンを追加 */
  width: 100%; /* 幅を100%に設定 */
  background: #ffffff; /* カードの背景色 */
  border: 1px solid #ddd; /* カードの境界線 */
  border-radius: 4px; /* カードの角を丸くする */
  overflow: hidden; /* 角を丸くしたときにコンテンツがはみ出さないようにする */
`;

const Title = styled.div`
  flex: 0 0 30%; /* 左側の幅を30%に設定 */
  display: flex;
  justify-content: center; /* タイトルのテキストを中央配置 */
  align-items: center; /* 垂直方向に中央配置 */
  font-size: 1.5rem; /* フォントサイズ調整 */
  padding: 10px; /* パディングを追加 */
  background: #ffffff; /* 背景色を統一 */
  border-right: 1px solid rgba(0, 0, 0, 0.2); /* タイトルと説明文の間に薄い線を追加 */
`;

const Description = styled.div`
  flex: 0 0 70%; /* 右側の幅を70%に設定 */
  display: flex;
  align-items: center; /* デスクリプションの垂直方向の中央配置 */
  padding-left: 20px; /* テキストと左の境界の間に余白を設定 */
  font-size: 1rem; /* フォントサイズ調整 */
  background: #ffffff; /* 背景色を統一 */
`;

const PostCard = ({ title, description }: { title: string, description: string }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

const PostList = () => {
  return (
    <>
      <PostCard title="title1" description="description" />
      <PostCard title="title2" description="description" />
      <PostCard title="title3" description="description" />
      <PostCard title="title4" description="description" />
      <PostCard title="title5" description="description" />
      <PostCard title="title6" description="description" />
      <PostCard title="title7" description="description" />
    </>
  );
};

const onClick = () => {
  console.log("PostContainer Clicked");
};

const PostContainer = () => {
  return (
    <Container onClick={onClick}>
      <PostList />
    </Container>
  );
};

export default PostContainer;

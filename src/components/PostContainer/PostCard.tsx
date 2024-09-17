import styled from "styled-components";

const Card = styled.div`
  margin: 5px;
`

const Title = styled.div`
  flex: 0 0 30%; /* 左側の幅を30%に設定 */
  display: flex;
  justify-content: center; /* タイトルのテキストを中央配置 */
  align-items: center; /* 垂直方向に中央配置 */
  font-size: 1.5rem; /* フォントサイズ調整 */
`;

const Description = styled.div`
  flex: 0 0 70%; /* 右側の幅を70%に設定 */
  display: flex;
  align-items: center; /* デスクリプションの垂直方向の中央配置 */
  padding-left: 10px; /* テキストと左の境界の間に余白を設定 */
  font-size: 1rem; /* フォントサイズ調整 */

  border-left: 1px solid rgba(0, 0, 0, 0.2); /* 中央の薄い線を追加 */
  padding-left: 20px; /* 線とテキストの間に余白を追加 */
`;

const PostCard = ({ title, description }:{
  title: string,
  description: string
}) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  )
}

export default PostCard
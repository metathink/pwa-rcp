import styled from "styled-components";

const Container = styled.footer`
  background: rgba(0, 0, 0, 0.8); /* 背景を黒に */
  color: white; /* テキストの色を白に */
  padding: 5px 0; /* 上下に余白を追加 */
  text-align: center; /* 中央揃え */
  position: fixed; /* 画面下部に固定 */
  width: 100%; /* 横幅を100%に */
  bottom: 0; /* 画面の下に固定 */
`;

const FooterText = styled.p`
  margin: 0; /* テキストのマージンをリセット */
  font-size: 0.9rem; /* フォントサイズを少し小さく */
`;

const FooterContainer = () => {
    return (
        <Container>
            <FooterText>
                end
            </FooterText>
        </Container>
    );
};

export default FooterContainer;

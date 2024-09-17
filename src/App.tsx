import styled from "styled-components";
import AppBar from "./components/AppBar";
import PostContainer from "./components/PostContainer/PostContainer";
import FooterContainer from "./components/FooterContainer";

export const AppContainer = styled.div`
    height: 100vh;
    width: 1200px; /* Fixed width */
    margin: 5px auto; /* Center the container */
    padding: 5px;

    /* Optional background styles */
    /* background-color: beige; 
    background-image: 
        linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%),
        linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.4) 75%);
    background-size: 40px 40px; 
    background-position: 0 0, 20px 20px;  */
`;

function App() {
  return (
    <>
      <AppContainer>
        <AppBar />
        <PostContainer />
      </AppContainer>
      <FooterContainer />
    </>
  );
}

export default App;

import styled from "styled-components";

const Bar = styled.div`
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px;
  margin: 5px;
  width: 95%;
  height: 2vh;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h4`
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 5px;
  margin-right: 10px;
`;
const SearchButton = styled.button`
  background-color: #ffffff; /* Green background */
  border: none; /* Remove border */
  padding: 5px 5px; /* Add some padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Make the button inline */
  cursor: pointer;
  font-size: 12px; /* Increase font size */
  margin: 4px 2px; /* Add some margin */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth transition for background color */
  
  &:hover {
    background-color: #caccca; /* ホバー時の背景色を少し濃い緑に */
  }
`;


const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const AppBar = () => (
    <Bar>
        <Title>My Recipe</Title>
        <RightSection>
            <SearchInput type="text" placeholder="Search..." />
            <SearchButton>🔍</SearchButton>
            <RadioGroup>
                <label>
                    <input type="radio" name="filter" value="title" /> Title
                </label>
                <label>
                    <input type="radio" name="filter" value="ingredients" /> Item
                </label>
                <label>
                    <input type="radio" name="filter" value="tags" /> Tags
                </label>
            </RadioGroup>
        </RightSection>
    </Bar>
);

export default AppBar;

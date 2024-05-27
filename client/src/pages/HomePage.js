import React, { useState } from "react";
import styled from "styled-components";
import background from "../assets/background_images/music_festival_gif.webp";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const HomePage = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
      navigate(`/search-results?q=${searchTerm}`);
    }
  };

  const handleSearchButtonClick = () => {
    onSearch(searchTerm);
    navigate(`/search-results?q=${searchTerm}`);
  };

  return (
    <BackgroundContainer>
      <HomePageContent>
        <CenteredContent>
          <input
            type="text"
            placeholder="What event are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <SearchButton onClick={handleSearchButtonClick}>
            <HiOutlineSearch size={35} />
          </SearchButton>
        </CenteredContent>
      </HomePageContent>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePageContent = styled.div`
  padding-top: 50px;
`;

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    border-radius: 25px;
    font-size: 25px;
    height: 55px;
    &::placeholder {
      font-size: 1rem;
      padding-left: 40px;
    }
  }
`;

const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

export default HomePage;
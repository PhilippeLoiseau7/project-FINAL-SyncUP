import React from "react";
import styled from "styled-components";
import SearchList from "../components/SearchList";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  return (
    <SearchPageContainer>
      <SearchList searchTerm={searchTerm} />
    </SearchPageContainer>
  );
};

const SearchPageContainer = styled.div`
  padding-top: 50px;
`;

export default SearchPage;
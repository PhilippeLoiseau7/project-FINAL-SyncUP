import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EventCard from "./EventCard";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";

const SearchList = ({ searchTerm }) => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `/api/search/events?page=${currentPage}&q=${searchTerm}`
        );
        const data = await response.json();
        setEvents(data.events);
        setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    if (searchTerm) {
      fetchEvents();
    }
  }, [currentPage, searchTerm]);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const totalButtonsToShow = Math.min(totalPages, 4);
    const firstPage = Math.max(
      1,
      currentPage - Math.floor(totalButtonsToShow / 2)
    );
    const lastPage = Math.min(firstPage + totalButtonsToShow - 1, totalPages);

    for (let i = firstPage; i <= lastPage; i++) {
      buttons.push(
        <PageButton key={i} onClick={() => setPage(i)} disabled={currentPage === i}>
          {i}
        </PageButton>
      );
    }

    return buttons;
  };

  return (
    <SearchPageContainer>
      <SearchResultInfo>
      <h1>Search Results for "{searchTerm}"</h1>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </SearchResultInfo>
      
      <AllPageButtons>
        <NavigationButton
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 || !searchTerm}
        >
          <IoMdSkipBackward />
        </NavigationButton>
        <NavigationButton onClick={prevPage} disabled={currentPage === 1 || !searchTerm}>
          <IoCaretBackSharp />
        </NavigationButton>
        {renderPageButtons()}
        <NavigationButton onClick={nextPage} disabled={currentPage === totalPages || !searchTerm}>
          <IoCaretForwardSharp />
        </NavigationButton>
        <NavigationButton
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages || !searchTerm}
        >
          <IoMdSkipForward />
        </NavigationButton>
      </AllPageButtons>

      {isLoading ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : (

      <ListContainer>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ListContainer>

      )}

      <AllPageButtons>
        <NavigationButton
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 || !searchTerm}
        >
          <IoMdSkipBackward />
        </NavigationButton>
        <NavigationButton onClick={prevPage} disabled={currentPage === 1 || !searchTerm}>
          <IoCaretBackSharp />
        </NavigationButton>
        {renderPageButtons()}
        <NavigationButton onClick={nextPage} disabled={currentPage === totalPages || !searchTerm}>
          <IoCaretForwardSharp />
        </NavigationButton>
        <NavigationButton
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages || !searchTerm}
        >
          <IoMdSkipForward />
        </NavigationButton>
      </AllPageButtons>

      <SearchResultInfo>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </SearchResultInfo>
    </SearchPageContainer>
  );
};

const SearchPageContainer = styled.div`
  
  
`;

const SearchResultInfo = styled.div`

h1 {
  font-size: 30px;
  padding-top: 10px;
  text-align: center;
}

p{
  font-size: 20px;
  text-align: center;
}

`
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
`;

const AllPageButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
  gap: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
    border-radius: 25px;
    border: none;
    height: 40px;
    width: 60px;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;



const NavigationButton = styled.button`
  
 
`;

const PageButton = styled.button`
  
  
`;

export default SearchList;
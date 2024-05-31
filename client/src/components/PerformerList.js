import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PerformerCard from './PerformerCard';
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";

const PerformerList = () => {
  const [performer, setPerformer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const response = await fetch(`/api/performers?page=${currentPage}`);
        const data = await response.json();
        setPerformer(data.performers);
        setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
      } catch (error) {
        console.error('Error fetching performers:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchPerformers();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const totalButtonsToShow = Math.min(totalPages, 4);
    const firstPage = Math.max(1, currentPage - Math.floor(totalButtonsToShow / 2));
    const lastPage = Math.min(firstPage + totalButtonsToShow - 1, totalPages);

    for (let i = firstPage; i <= lastPage; i++) {
      buttons.push(
        <button key={i} onClick={() => setPage(i)} disabled={currentPage === i}>
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <PerformerListPage>
      <PerformerPageinfo>
        <h1>Performers</h1>
          <p>Page {currentPage} of {totalPages}</p>
      </PerformerPageinfo>
      
      <AllPageButtons>
        <NavigationButton
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 }
        >
          <IoMdSkipBackward />
        </NavigationButton>
        <NavigationButton onClick={prevPage} disabled={currentPage === 1 }>
          <IoCaretBackSharp />
        </NavigationButton>
        {renderPageButtons()}
        <NavigationButton onClick={nextPage} disabled={currentPage === totalPages }>
          <IoCaretForwardSharp />
        </NavigationButton>
        <NavigationButton
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages }
        >
          <IoMdSkipForward />
        </NavigationButton>
      </AllPageButtons>

      {isLoading ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : (

      <ListContainer>
        {performer.map(performer => (
          <PerformerCard key={performer.id} performer={performer} />
        ))}
      </ListContainer>

      )}

      <AllPageButtons>
        <NavigationButton
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 }
        >
          <IoMdSkipBackward />
        </NavigationButton>
        <NavigationButton onClick={prevPage} disabled={currentPage === 1 }>
          <IoCaretBackSharp />
        </NavigationButton>
        {renderPageButtons()}
        <NavigationButton onClick={nextPage} disabled={currentPage === totalPages }>
          <IoCaretForwardSharp />
        </NavigationButton>
        <NavigationButton
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages }
        >
          <IoMdSkipForward />
        </NavigationButton>
      </AllPageButtons>

      <PerformerPageinfo>
        <p>Page {currentPage} of {totalPages}</p>
      </PerformerPageinfo>

    </PerformerListPage>
  );
};

const PerformerListPage = styled.div`

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

const PerformerPageinfo = styled.div`

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

export default PerformerList;
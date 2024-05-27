import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PerformerCard from './PerformerCard';

const PerformerList = () => {
  const [performer, setPerformer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const response = await fetch(`/api/performers?page=${currentPage}`);
        const data = await response.json();
        setPerformer(data.performers);
        setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
      } catch (error) {
        console.error('Error fetching performers:', error);
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
    <div>
      <h1>Performers</h1>
      <p>Page {currentPage} of {totalPages}</p>
      <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
        First Page
      </button>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      {renderPageButtons()}
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
      <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
        Last Page
      </button>
      <ListContainer>
        {performer.map(performer => (
          <PerformerCard key={performer.id} performer={performer} />
        ))}
      </ListContainer>
    </div>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

export default PerformerList;
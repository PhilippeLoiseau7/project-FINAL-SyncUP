import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/events?page=${currentPage}`);
        const data = await response.json();
        setEvents(data.events);
        setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchEvents();
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
      <h1>Events</h1>
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
      {isLoading ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : (
        <ListContainer>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </ListContainer>
      )}
    </div>
  );
};

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
  height: 200px; /* Adjust height as needed */
  font-size: 1.2rem;
`;

export default EventList;
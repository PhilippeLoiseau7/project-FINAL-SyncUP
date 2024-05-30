import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GroupCard from './GroupCard';

const GroupList = ({ eventId }) => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/groups?eventId=${eventId}`);
        const data = await response.json();

        
        if (data && data.groups) {
          setGroups(data.groups);
        } else {
          setGroups([]); 
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, [eventId]);

  return (
    <div>
      <h1>Existing groups for this event:</h1>
      {isLoading ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : (
        <ListContainer>
          {groups.length > 0 ? (
            groups.map((group) => (
              <GroupCard key={group._id} group={group} />
            ))
          ) : (
            <p>No groups available.</p>
          )}
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

export default GroupList;
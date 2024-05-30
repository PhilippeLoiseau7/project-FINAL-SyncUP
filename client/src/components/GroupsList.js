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
    <GroupListContainer>
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
    </GroupListContainer>
  );
};

const GroupListContainer = styled.div`
  margin-top: 30px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 900px;
  
  h1 {
    font-size: 1.5em;
    text-align: center;
  }
`

const ListContainer = styled.div`
  display: flex;
  flow-direction: row;
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

export default GroupList;
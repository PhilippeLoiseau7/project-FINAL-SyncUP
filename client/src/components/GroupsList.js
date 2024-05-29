import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GroupCard from './GroupCard';

const GroupList = ({ eventId }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`/api/groups?eventId=${eventId}`);
        const data = await response.json();
        console.log(data)
        setGroups(data.groups);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroups([]); 
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h1>Existing groups for this event:</h1>
      <ListContainer>
        {groups.length > 0 ? (
          groups.map(group => (
            <GroupCard key={group._id} group={group} />
          ))
        ) : (
          <p>No groups available.</p>
        )}
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

export default GroupList;
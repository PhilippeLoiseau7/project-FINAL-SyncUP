import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUserProfile } from '../components/UserProfileContext';
import { Link } from 'react-router-dom';

const GroupsPage = () => {
    const { userProfile } = useUserProfile();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch(`/api/groups-joined?username=${userProfile.username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }
                const data = await response.json();
                setGroups(data.groups);
                console.log(data.groups)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [userProfile.username]);

    if (loading) {
        return <LoadingContainer>Loading...</LoadingContainer>;
    }

    if (error) {
        return <ErrorContainer>{error}</ErrorContainer>;
    }

    return (
        <GroupsPageContainer>
            <h1>Groups Joined:</h1>
            <GroupListContainer>
                {groups.length === 0 ? (
                    <NoGroupsMessage>You are not a member of any groups.</NoGroupsMessage>
                ) : (
                    <GroupList>
                        {groups.map((group) => (
                            <GroupLink key={group._id} to={`/group/${group._id}`}>
                                <GroupItem>
                                    <GroupName>{group.groupName}</GroupName>
                                    <p>Created by: {group.createdBy}</p>
                                    <p>Members: {group.members.length}</p>
                                </GroupItem>
                            </GroupLink>
                        ))}
                    </GroupList>
                )}
            </GroupListContainer>
        </GroupsPageContainer>
    );
};

const GroupsPageContainer = styled.div`
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;

    h1 {
        font-size: 2rem;
    }
`;

const GroupListContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
`;

const ErrorContainer = styled.div`
    color: red;
    font-size: 1.5rem;
`;

const NoGroupsMessage = styled.p`
    font-size: 1.5rem;
    color: #666;
`;

const GroupList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const GroupLink = styled(Link)`
    text-decoration: none;
    color: black;
    width: 400px;
    margin: 10px;
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-10px);
    }
`;

const GroupItem = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: black solid 1px;
    margin: 20px;
    padding: 20px;
    width: 100%;
`;

const GroupName = styled.h2`
    font-size: 2rem;
    margin-bottom: 10px;
`;

export default GroupsPage;
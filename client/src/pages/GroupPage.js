import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserProfile } from '../components/UserProfileContext';

const GroupPage = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [event, setEvent] = useState(null);
    const [joinStatusMessage, setJoinStatusMessage] = useState('');
    const { userProfile } = useUserProfile();
    const [isMember, setIsMember] = useState(false);
    const [comment, setComment] = useState('');
    const [commentStatusMessage, setCommentStatusMessage] = useState('');

    const fetchGroup = async () => {
        try {
            const response = await fetch(`/api/group/${groupId}`);
            const data = await response.json();
            if (data.group) {
                setGroup(data.group);
                setIsMember(data.group.members.includes(userProfile.username));
            } else {
                console.error('Group is null or undefined');
                console.log(data);
            }
        } catch (error) {
            console.error('Error fetching group:', error);
        }
    };

    useEffect(() => {
        fetchGroup();
    }, [groupId, userProfile.username]);

    useEffect(() => {
        if (group && group.eventId) {
            const fetchEvent = async () => {
                try {
                    const response = await fetch(`/api/event/${group.eventId}`);
                    const data = await response.json();
                    setEvent(data.events);
                } catch (error) {
                    console.error('Error fetching event:', error);
                }
            };

            fetchEvent();
        }
    }, [group]);

    const handleJoinGroup = async () => {
        try {
            const response = await fetch(`/api/group/${groupId}/join`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userProfile.username,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to join group');
            }

            const data = await response.json();
            if (data.message === 'Already Joined') {
                setJoinStatusMessage(`${userProfile.username} is already a member of the group`);
            } else {
                setJoinStatusMessage('Joined group successfully');
            }

            setGroup(data.group);
            setIsMember(true);

            fetchGroup();
            setTimeout(() => {
                setJoinStatusMessage('');
            }, 4000);

        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            const response = await fetch(`/api/group/${groupId}/leave`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userProfile.username,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to leave group');
            }

            const data = await response.json();
            setJoinStatusMessage('Left group successfully');
            setGroup(data.group);
            setIsMember(false);

            fetchGroup();
            setTimeout(() => {
                setJoinStatusMessage('');
            }, 4000);

        } catch (error) {
            console.error('Error leaving group:', error);
        }
    };

    const handleAddComment = async () => {
        console.log('Adding comment to group with groupId:', groupId);
        console.log('Comment sender:', userProfile.username);
        console.log('Comment message:', comment)

        try {
            const response = await fetch(`/api/groups/${groupId}/comments`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderName: userProfile.username,
                    message: comment,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            const data = await response.json();
            setCommentStatusMessage('Comment added successfully');
            setComment('');
            setGroup(data.group);

            fetchGroup();
            setTimeout(() => {
                setCommentStatusMessage('');
            }, 3000);

        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteGroup = async () => {
        try {
            const response = await fetch(`/api/groups/${groupId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete group');
            }

            const data = await response.json();
            if (data.status === 200) {
                navigate('/groups'); // Redirect to the groups list page
            } else {
                console.error('Failed to delete group:', data.message);
            }
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    if (!group || !event) {
        return <LoadingContainer>Loading...</LoadingContainer>;
    }

    return (
        <GroupPageContainer>
            <GroupPageDetails>
                <GroupName>{group.groupName}</GroupName>
                <EventTitle>{event.title}</EventTitle>
                <GroupMembers>
                    Members:
                    <ul>
                        {group.members.map((member, index) => (
                            <li key={`${index}-${member}`}>{member}</li>
                        ))}
                    </ul>
                </GroupMembers>
                {joinStatusMessage && (
                    <JoinStatusMessage>{joinStatusMessage}</JoinStatusMessage>
                )}

                {userProfile.username === group.createdBy && (
                    <DeleteButton onClick={handleDeleteGroup}>Delete Group</DeleteButton>
                )}

                {isMember ? (
                    <>
                        <CommentSection>
                            <h2>Chat</h2>
                            <ul>
                                {group.comments.map((comment, index) => (
                                    <li key={`${index}-${comment._id}`}>
                                        <span>{comment.senderName}:</span> {comment.message} <span>({new Date(comment.sentAt).toLocaleString()})</span>
                                    </li>
                                ))}
                            </ul>
                            {commentStatusMessage && (
                                <CommentStatusMessage>{commentStatusMessage}</CommentStatusMessage>
                            )}
                            <CommentForm>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your message here..."
                                />
                                <CommentButton onClick={handleAddComment}>Send</CommentButton>
                            </CommentForm>
                            <LeaveButton onClick={handleLeaveGroup}>Leave Group</LeaveButton>
                        </CommentSection>
                    </>
                ) : (
                    <JoinButton onClick={handleJoinGroup}>Join Group</JoinButton>
                )}
            </GroupPageDetails>
        </GroupPageContainer>
    );
};

const GroupPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding-top: 50px;
`;

const GroupPageDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 900px;
    padding: 20px;
`;

const GroupName = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 10px;
`;

const GroupMembers = styled.div`
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
`;

const EventTitle = styled.h2`
    font-size: 2rem;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
`;

const JoinButton = styled.button`
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const LeaveButton = styled.button`
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #c82333;
    }
`;

const DeleteButton = styled.button`
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;

    &:hover {
        background-color: #e60000;
    }
`;

const JoinStatusMessage = styled.p`
    font-size: 1rem;
    color: #28a745;
`;

const CommentSection = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const CommentStatusMessage = styled.p`
    font-size: 1rem;
    color: #28a745;
`;

const CommentForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    textarea {
        width: 100%;
        height: 80px;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
`;

const CommentButton = styled.button`
    align-self: flex-end;
    font-size: 1rem;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export default GroupPage;
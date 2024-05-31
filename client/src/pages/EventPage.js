import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useUserProfile } from '../components/UserProfileContext';
import GroupList from '../components/GroupsList';

const EventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const { userProfile } = useUserProfile();
    const [loading, setLoading] = useState(true);
    const [newGroupName, setNewGroupName] = useState('');
    const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/event/${eventId}`);
                const data = await response.json();
                setEvent(data.events);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally{
                setLoading(false)
            }
        };

        fetchEvent();

    }, [eventId]);

    if (loading === true) {
        return <LoadingMessage>Loading event details...</LoadingMessage>;
    }

    const handleCreateGroup = async () => {
        try {
            const response = await fetch('/api/create_group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: eventId,
                    groupName: newGroupName,
                    createdByUsername: userProfile.username,
                    event: event.title,
                    dateAndTime: new Date(event.datetime_local),
                    cityAndCountry: `${event.venue.city}, ${event.venue.country}`
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create group');
            }

            setNewGroupName('');
            setShowCreateGroupForm(false);
            
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    
    const formattedDate = () => {

        const eventDate = new Date(event.datetime_local);
        const options = { hour: "2-digit", minute: "2-digit" };

        const formatted = {
                            weekday: 'short',
                            month: 'long',
                            day: 'numeric',
                            year: eventDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
                        };

        const date = eventDate.toLocaleDateString(undefined, formatted);
        const time = eventDate.toLocaleTimeString(undefined, options);

        if (event.datetime_tbd === true && event.time_tbd === true) {

                return `Date TBD - Time TBD `

        } else if (event.time_tbd === true) {

                return `${date} at Time TBD`;

        } else if (event.datetime_tbd === true) {

                return `Date TBD at ${time} `

        } else {

            return `${date} at ${time}`

        }
    };

    return (
        <EventPageContainer>
            <EventCardContainer>
                <Thumbnail src={event.performers[0]?.images?.huge} alt={event.title} />
                <EventDetails>
                    <EventTitle>{event.title}</EventTitle>
                    <DateAndTime>
                        <p>{formattedDate()}</p>
                    </DateAndTime>
                    <VenueAndLocation>
                        <p>{event.venue.name}</p>
                        <p>{event.venue.address}, {event.venue.city}, {event.venue.state} </p>
                        <p>{event.venue.country}</p>
                        <p>{event.venue.postal_code}</p>
                    </VenueAndLocation>
                </EventDetails>
            </EventCardContainer>
            <Description>
                <h2>Description</h2>
                <p>{event.description || 'No description available.'}</p>
            </Description>
            <Performers>
                <h2>Performer:</h2>
                {event.performers.map((performer) => (
                    <PerformerLink to={`/performer/${performer.id}`} key={performer.id}>
                        <PerformerImage src={performer.images.huge} alt={performer.name} />
                        <PerformerName>{performer.name}</PerformerName>
                    </PerformerLink>
                ))}
            </Performers>
            {userProfile && (
                <>
            <div>
                <GroupList eventId={eventId}></GroupList>
            </div>
            <CreateGroupButton onClick={() => setShowCreateGroupForm(true)}>Create a Group</CreateGroupButton>
            {showCreateGroupForm && (
                <ModalContainer>
                    <ModalContent>
                        <h2>Create a Group</h2>
                        <form onSubmit={handleCreateGroup}>
                            <label>Group Name:</label>
                            <input
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                required
                            />
                            <button type="submit">Create Group</button>
                        </form>
                        <CloseButton onClick={() => setShowCreateGroupForm(false)}>Close</CloseButton>
                    </ModalContent>
                </ModalContainer>
            )}
            </>
        )}
        </EventPageContainer>
    );
};

const EventPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding-top: 50px;
`;

const EventCardContainer = styled.div`
    display: flex;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
    max-width: 900px;
    width: 100%;
`;

const Thumbnail = styled.img`
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

const EventDetails = styled.div`
    padding: 20px;
    flex: 1;
`;

const EventTitle = styled.div`
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
`;

const DateAndTime = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1em;
    color: gray;
    margin-bottom: 10px;
`;

const VenueAndLocation = styled.div`
    font-size: 1em;
    color: gray;

    p {
        margin: 0;
    }
`;

const Description = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 900px;
    width: 100%;

    h2 {
        font-size: 1.5em;
        margin-bottom: 10px;
    }

    p {
        color: gray;
    }
`;

const LoadingMessage = styled.p`
    font-size: 1.2em;
    color: gray;
`;

const Performers = styled.div`
background: white;
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
margin-top: 20px;
padding: 20px;
max-width: 900px;
width: 100%;

h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

p {
    color: black;
}

`;

const PerformerLink = styled(Link)`
    display: block;
    font-size: 1.1em;
    color: black;
    margin-bottom: 5px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
        text-decoration-color: black;
    }
`;

const PerformerImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
`;

const PerformerName = styled.p`
    font-size: 1.2em;
    color: black;
`;

const ModalContainer = styled.div`
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    text-align: center;

    h2 {
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    label {
        font-weight: bold;
    }

    input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
    }

    button {
        background-color: black;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: grey;
        }
    }
`;

const CloseButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #c82333;
    }
`;

const CreateGroupButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    font-size: 18px;
    margin-top: 30px;
    padding: 15px 40px;
    border-radius: 4px;
    &:hover {
        cursor: pointer;
    }`

export default EventPage;
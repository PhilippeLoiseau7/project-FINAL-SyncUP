import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const EventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/event/${eventId}`);
                const data = await response.json();
                setEvent(data.events);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (!event) {
        return <LoadingMessage>Loading event details...</LoadingMessage>;
    }

    const eventDate = new Date(event.datetime_local);
    const formattedDate = event.datetime_tbd === true ? 'Date TBD - Time TBD' : `${eventDate.toLocaleTimeString()} - ${eventDate.toDateString()}`;

    return (
        <EventPageContainer>
            <EventCardContainer>
                <Thumbnail src={event.performers[0]?.images?.huge} alt={event.title} />
                <EventDetails>
                    <Performer>{event.performers[0]?.name}</Performer>
                    <DateAndTime>
                        <p>{formattedDate}</p>
                    </DateAndTime>
                    <VenueAndLocation>
                        <p>{event.venue.name}</p>
                        <p>{event.display_location}</p>
                    </VenueAndLocation>
                </EventDetails>
            </EventCardContainer>
            <Description>
                <h2>Description</h2>
                <p>{event.description || 'No description available.'}</p>
            </Description>
            
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
    max-width: 600px;
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

const Performer = styled.div`
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
    max-width: 600px;
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

export default EventPage;
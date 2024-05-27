import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const PerformerPage = () => {
    const { performerId } = useParams();
    const [performer, setPerformer] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        const fetchPerformer = async () => {
            try {
                const response = await fetch(`/api/performer/${performerId}`);
                const data = await response.json();
                setPerformer(data.performer);
            } catch (error) {
                console.error('Error fetching performer:', error);
            }
        };

        fetchPerformer();
    }, [performerId]);

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await fetch(`/api/performers/upcoming-events/?performerIds=${performerId}`);
                const data = await response.json();
                setUpcomingEvents(data.events);
            } catch (error) {
                console.error('Error fetching upcoming events:', error);
            }
        };

        if (performerId) {
            fetchUpcomingEvents();
        }
    }, [performerId]);

    if (!performer) {
        return <LoadingMessage>Loading performer details...</LoadingMessage>;
    }

    const formattedDate = (dateString) => {
        if (!dateString) return "Date TBD - Time TBD";

        const performerDate = new Date(dateString);
        const options = { hour: "2-digit", minute: "2-digit" };

        const formatted = {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: performerDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
        };

        const date = performerDate.toLocaleDateString(undefined, formatted);
        const time = performerDate.toLocaleTimeString(undefined, options);

        return `${date} at ${time}`;
    };

    return (
        <PerformerPageContainer>
            <PerformerCardContainer>
                <PerformerImage>
                    <Thumbnail src={performer.images?.huge} alt={performer.name} />
                </PerformerImage>
                <PerformerDetails>
                    <PerformerName>{performer.name}</PerformerName>
                </PerformerDetails>
            </PerformerCardContainer>
            <PerformerUpcomingEventsContainer>
                <h1>Upcoming Events</h1>
                {upcomingEvents.length === 0 ? (
                    <LoadingMessage>No upcoming events found for this performer.</LoadingMessage>
                ) : (
                    upcomingEvents.map((event) => (
                        <EventCard to={`/events/${event.id}`} key={event.id} >
                            <h2>{event.title}</h2>
                            <DateAndTime>
                                <p>{formattedDate(event.datetime_local)}</p>
                            </DateAndTime>
                            <VenueAndLocation>
                                <p>{event.venue.name}, {event.venue.city}</p>
                            </VenueAndLocation>
                        </EventCard>
                    ))
                )}
            </PerformerUpcomingEventsContainer>
        </PerformerPageContainer>
    );
};

const PerformerPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding-top: 50px;
`;

const PerformerCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
    max-width: 300px;
    width: 100%;
`;

const Thumbnail = styled.img`
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 10px;
`;

const PerformerDetails = styled.div`
    padding: 20px;
    flex: 1;
`;

const PerformerName = styled.div`
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
`;

const PerformerUpcomingEventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
    max-width: 1000px;
    width: 100%;
`;

const EventCard = styled(Link)`
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    text-decoration: none;
    color: black;
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


const LoadingMessage = styled.p`
    font-size: 1.2em;
    color: gray;
`;

const PerformerImage = styled.div`
`;

export default PerformerPage;
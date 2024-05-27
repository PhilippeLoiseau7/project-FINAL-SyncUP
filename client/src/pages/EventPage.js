import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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

    const formattedDate = () => {

        if (event.datetime_tbd === true) {
                return "Date TBD - Time TBD"
        } else {
                const eventDate = new Date(event.datetime_local);
                        const options = { hour: "2-digit", minute: "2-digit" };

                        const formatted = {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: eventDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
                        };

                        const date = eventDate.toLocaleDateString(undefined, formatted);
                        const time = eventDate.toLocaleTimeString(undefined, options);

                        return `${date} at ${time}`;
        }
    }

    return (
        <EventPageContainer>
            <EventCardContainer>
                <Thumbnail src={event.performers[0]?.images?.huge} alt={event.title} />
                <EventDetails>
                    <Performer>{event.performers[0]?.name}</Performer>
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

const Performers = styled.div`
background: white;
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
margin-top: 20px;
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

const PerformerLink = styled(Link)`
    display: block;
    font-size: 1.1em;
    color: blue;
    margin-bottom: 5px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
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
`;

export default EventPage;
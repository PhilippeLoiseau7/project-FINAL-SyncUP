import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
    const eventDate = new Date(event.datetime_local);

    const formattedDate = event.datetime_tbd === true ? 'Date TBD - Time TBD' : `${eventDate.toLocaleTimeString()} - ${eventDate.toDateString()}`;


    return (
        <EventCardLink to={`/events/${event.id}`}>
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
        </EventCardLink>
    );
};

const EventCardLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const EventCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 10px;
    max-width: 300px;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const EventDetails = styled.div`
    padding: 10px;
`;

const Performer = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
`;

const DateAndTime = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
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

export default EventCard;
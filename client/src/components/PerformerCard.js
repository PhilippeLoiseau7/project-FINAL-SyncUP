import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PerformerCard = ({ performer }) => {
    

    return (
        <PerformerCardLink to={`/performer/${performer.id}`}>
            <PerformerCardContainer>
                <Thumbnail src={performer.images?.huge} alt={performer.title} />
                <PerformerDetails>
                    <Performer>{performer.name}</Performer>
                </PerformerDetails>
            </PerformerCardContainer>
        </PerformerCardLink>
    );
};

const PerformerCardLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const PerformerCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 10px;
    width: 300px;
    transition: transform 0.3s ease;
    height: 300px;
    &:hover {
        transform: translateY(-10px);
    }
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const PerformerDetails = styled.div`
    padding: 10px;
    text-align: center;
    font-size: 17px;
`;

const Performer = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
`;

export default PerformerCard;
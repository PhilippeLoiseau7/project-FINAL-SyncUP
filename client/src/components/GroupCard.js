import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
    

    return (
        <GroupCardLink to={`/group/${group._id}`}>
            <GroupCardContainer>
                <GroupDetails>
                    <Group>{group.groupName}</Group>
                    <p>
                        {group.members.length}{" "}
                        {group.members.length === 1 ? "member" : "members"}
                    </p>
                </GroupDetails>
            </GroupCardContainer>
        </GroupCardLink>
    );
};

const GroupCardLink = styled(Link)`
    text-decoration: none;
    color: black;
`

const GroupCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 10px;
    width: 300px;
    transition: transform 0.3s ease;
    height: 150px;
    &:hover {
        transform: translateY(-5px);
    }
`;

const GroupDetails = styled.div`
    padding: 10px;
    text-align: center;
    font-size: 17px;
`;

const Group = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
`;

export default GroupCard
import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const SideNavbar = ({ isOpen, toggleSidebar }) => {

    return (
        <SideBarContainer isOpen={isOpen}>
            <StyledUnorderedList>
                <li> <StyledLink to="/" onClick={toggleSidebar}> Home </StyledLink>  </li>
                <li> <StyledLink to="/events" onClick={toggleSidebar}> Events </StyledLink> </li>
                <li> <StyledLink to="/performers" onClick={toggleSidebar}> Performers </StyledLink> </li>
                <li> <StyledLink to="/venues" onClick={toggleSidebar}> Venues </StyledLink> </li> 
                <li> <StyledLink to="/categories" onClick={toggleSidebar}> Categories </StyledLink> </li>
                <li> <StyledLink to="/groups" onClick={toggleSidebar}> Groups </StyledLink> </li>
                <li> <StyledLink to="/profile" onClick={toggleSidebar}> Profile </StyledLink> </li>
                <li> <StyledLink to="/settings" onClick={toggleSidebar}> Settings </StyledLink> </li>
            </StyledUnorderedList>
        </SideBarContainer>
    )

};


const SideBarContainer = styled.nav`

    width: 250px;
    height: 100vh;
    background-color: #333;
    padding-top: 50px;
    position: fixed;
    top: 0;
    left: ${( {isOpen} ) => (isOpen ? '0' : '-250px')};
    transition: left 0.3s ease-in-out;
    z-index: 1000;
    overflow-x: hidden;

`

const StyledLink = styled(Link)`

    display: block;
    color: white;
    padding: 16px;
    text-decoration: none;
    font-size: 1.2rem;

    &:hover {
    background-color: #575757;
    }

`

const StyledUnorderedList = styled.ul`

    li {

    }

`

export default SideNavbar
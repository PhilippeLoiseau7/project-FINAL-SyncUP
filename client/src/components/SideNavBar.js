import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useUserProfile } from './UserProfileContext';

    const SideNavbar = ({ isOpen, toggleSidebar }) => {
        const { userProfile } = useUserProfile();
        const { logout } = useUserProfile();

        const logoutAndtoggleSidebar = () => {
          logout()
          toggleSidebar()
        }

        return (
          <SideBarContainer isOpen={isOpen}>
            <StyledUnorderedList>
              <li> <StyledLink to="/" onClick={toggleSidebar}> Home </StyledLink>  </li>
              <li> <StyledLink to="/events" onClick={toggleSidebar}> Events </StyledLink> </li>
              <li> <StyledLink to="/performers" onClick={toggleSidebar}> Performers </StyledLink> </li>
              {userProfile && (
                <>
                  <li> <StyledLink to="/groups" onClick={toggleSidebar}> Groups </StyledLink> </li>
                  <li> <StyledLink to="/" onClick={logoutAndtoggleSidebar}> Logout </StyledLink> </li>
                  
                </>
              )}
              {!userProfile && (
                <li> <StyledLink to="/login" onClick={toggleSidebar}> Login / Sign Up </StyledLink> </li>
              )}
            </StyledUnorderedList>
          </SideBarContainer>
        );
      };



const SideBarContainer = styled.nav`

    width: 250px;
    height: 100vh;
    background-color: black;
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
    background-color: #333333;
    }

`

const StyledUnorderedList = styled.ul`

    li {

    }

`

export default SideNavbar
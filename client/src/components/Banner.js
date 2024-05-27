import React from "react";
import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import { GrGroup } from "react-icons/gr";
import { useUserProfile } from './UserProfileContext';

const Banner = ({ isOpen, toggleSidebar }) => {
    const { userProfile } = useUserProfile();

    return (
        <BannerContainer>
            <StyledUnorderedList>
                <LeftSideBanner>
                    <li onClick={toggleSidebar}>{isOpen ? <CgClose size={20}/> : <RxHamburgerMenu size={20} /> }</li>
                    <li><span>SyncUp<GrGroup/></span></li>
                </LeftSideBanner>
                <RightSideBanner>
                    {userProfile && (
                        <>
                            <p>Welcome, {userProfile.username}</p>
                            
                        </>
                        
                    )}
                </RightSideBanner>
            </StyledUnorderedList>
        </BannerContainer>
    );
};

const BannerContainer = styled.div`
    background-color: #333;
    color: white;
    padding: 10px;
    position: fixed;
    margin-bottom: 10px;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 1100;
`;

const StyledUnorderedList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%;

    li {
        display: flex;
        align-items: center;
        margin-left: 20px;  
        cursor: pointer;

        span {
            display: flex;
            align-items: center;
            font-size: 30px;
            cursor: default;
        }
    }
`;

const LeftSideBanner = styled.div`
    display: flex;
`;

const RightSideBanner = styled.div`
    display: flex;
`;

export default Banner;
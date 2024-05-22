import React from "react"
import styled from "styled-components"
import { RxHamburgerMenu } from "react-icons/rx";
import { GrGroup } from "react-icons/gr";

const Banner = ({ toggleSidebar }) => {

    return (

        <BannerContainer>
            <StyledUnorderedList>
                <LeftSideBanner>
                    <li onClick={toggleSidebar}><RxHamburgerMenu /></li>
                    <li><span>SyncUp<GrGroup/></span></li>
                </LeftSideBanner>
                <RightSideBanner>
                    <li>Theme</li>
                    <li>CA</li>
                    <li>US</li>
                </RightSideBanner>

            </StyledUnorderedList>
        </BannerContainer>

    )

}

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
    justify-content: space-between ;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%;
    li {
        span{
            display: flex;
            align-items: center;
            font-size: 30px;
        }
        display: flex;
        align-items: center;
        margin-left: 20px;  
        cursor: pointer;
    }
`;

const LeftSideBanner = styled.div`
display: flex;
`
const RightSideBanner = styled.div`
display: flex;
`

export default Banner;

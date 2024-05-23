import React from "react"
import styled from "styled-components";
import background from "../assets/background_images/music_festival_gif.webp"
import { HiOutlineSearch } from "react-icons/hi";

const HomePage = () => {

    return (

        <BackgroundContainer>
            <HomePageContent>
                    <CenteredContent>
                        
                        <input type="text" placeholder="What event are you looking for?"></input>
                        <submit><HiOutlineSearch size={35}/></submit>
                    </CenteredContent>
                
            </HomePageContent>
        </BackgroundContainer>
        

    )

}

const BackgroundContainer = styled.div`
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const HomePageContent = styled.div`
    padding-top: 50px;

`;

const CenteredContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
        input {
            border-radius: 25px;
            font-size: 25px;
            height: 55px;
                &::placeholder{
                    font-size: 1rem;
                    padding-left: 40px;
                }
        }
`



export default HomePage;
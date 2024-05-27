import React from "react"
import PerformerList from "../components/PerformerList";
import styled from "styled-components";

const PerformersPage = () => {

    return (

        <PerformersPageContainer>
            <PerformerList/>
        </PerformersPageContainer>
        

    )

}

const PerformersPageContainer = styled.div`
    padding-top: 50px;

`
export default PerformersPage;
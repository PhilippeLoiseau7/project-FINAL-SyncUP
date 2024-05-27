import React from "react"
import styled from "styled-components"
import EventList from '../components/EventList'

const EventsPage = () => {

    return (

       <EventsPageContainer>
            <EventList/>
       </EventsPageContainer>

    )

}

const EventsPageContainer = styled.div`
    padding-top: 50px;

`
export default EventsPage;
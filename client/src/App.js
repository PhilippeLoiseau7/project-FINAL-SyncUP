import Banner from "./components/Banner";
import SideNavbar from "./components/SideNavBar";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import styled from "styled-components";
import { useState } from "react";
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage'
import PerformersPage from './pages/PerformersPage';
import VenuesPage from './pages/VenuesPage';
import CategoriesPage from './pages/CategoriesPage';
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import GroupsPage from "./pages/GroupsPage";
import GlobalStyle from "./styles/globalStyles";



const App = () => {

const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
    return (
        <Router>
        <GlobalStyle />
        <Banner toggleSidebar={toggleSidebar}/>
        <SideNavbar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <MainContent isOpen={isOpen}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/performers" element={<PerformersPage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        </MainContent>
        </Router>

    );
  };

const MainContent = styled.div`
    margin-left: ${({ isOpen }) => (isOpen ? '250px' : '0')};
    padding-top: 60px;
    padding-left: 20px;
    transition: margin-left 0.3s ease-in-out;
`;
  
  export default App;
  
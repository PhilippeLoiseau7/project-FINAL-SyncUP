import Banner from "./components/Banner";
import SideNavbar from "./components/SideNavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventsPage from "./pages/EventsPage";
import SearchPage from "./pages/SearchPage";
import PerformerPage from "./pages/PerformerPage";
import PerformersPage from "./pages/PerformersPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import SettingsPage from "./pages/SettingsPage";
import GroupsPage from "./pages/GroupsPage";
import GlobalStyle from "./styles/globalStyles";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <Router>
        <BannerDiv>
          <Banner toggleSidebar={toggleSidebar} isOpen={isOpen} />
        </BannerDiv>
        <Content>
          <SideNavbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <Overlay isOpen={isOpen} onClick={toggleSidebar} />
          <Routes>
            <Route
              path="/"
              element={<HomePage onSearch={handleSearch} />}
            />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={<EventPage />} />
            <Route
              path="/search-results"
              element={<SearchPage searchTerm={searchTerm} />}
            />
            <Route path="/performers" element={<PerformersPage />} />
            <Route path="/performer/:performerId" element={<PerformerPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Content>
      </Router>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const BannerDiv = styled.div``;

const Content = styled.div``;

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100% - 50px);
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export default App;
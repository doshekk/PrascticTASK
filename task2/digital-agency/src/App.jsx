import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import TestimonySection from "./components/TestimonySection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

import './styles.css';

const App = () => {
  return (
    <Router>
      <div>
        {/* Навігація */}
        <header className="header">
          <div className="logo-icon">
            <div className="square"></div>
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
          </div>

          <ul className="nav-menu">
            <li><Link to="/" className="nav-item">Home</Link></li>
            <li><Link to="/about" className="nav-item">About Us</Link></li>
            <li><Link to="/portfolio" className="nav-item">Portfolio</Link></li>
            <li><Link to="/news" className="nav-item">News</Link></li>
            <li><Link to="/contact" className="nav-item">Contact</Link></li>
          </ul>
        </header>

        {/* Маршрутизація для різних розділів */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<SectionPage section={<AboutSection />} />} />
          <Route path="/portfolio" element={<SectionPage section={<PortfolioSection />} />} />
          <Route path="/news" element={<SectionPage section={<TestimonySection />} />} />
          <Route path="/contact" element={<SectionPage section={<ContactSection />} />} />
        </Routes>
      </div>
    </Router>
  );
};

// Головна сторінка з усіма секціями
const Home = () => (
  <div>
    <Header />
    <AboutSection />
    <PortfolioSection />
    <TestimonySection />
    <BlogSection />
    <ContactSection />
    <Footer />
  </div>
);

// Компонент для відображення кожного розділу на окремій сторінці
const SectionPage = ({ section }) => (
  <div>
    <Header />
    {section} 
    <Footer />
  </div>
);

export default App;

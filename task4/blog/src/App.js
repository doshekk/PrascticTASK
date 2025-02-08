import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import cardsData from './cardsData';
import CategoriesPage from './CategoriesPage';
import CardDetail from './CardDetail';
import './App.css'; // Підключення CSS‑стилів

const getDisplayTitle = (fullTitle) => {
  const parts = fullTitle.split(':');
  return parts.length > 1 ? parts.slice(1).join(':').trim() : fullTitle;
};

const Cards = ({ searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("date-desc");
  const cardsPerPage = 9;

  const filteredCards = cardsData.filter(card => {
    const matchesCategory =
      selectedCategory === "all" || card.categories.includes(selectedCategory);
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortOption === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortOption === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortOption === "title-asc")
      return getDisplayTitle(a.title).localeCompare(getDisplayTitle(b.title));
    if (sortOption === "title-desc")
      return getDisplayTitle(b.title).localeCompare(getDisplayTitle(a.title));
    return 0;
  });

  const totalPages = Math.ceil(sortedCards.length / cardsPerPage);
  const currentCards = sortedCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <div>
      <nav className="category-nav">
        <div className="categories-links">
          <ul>
            {["all", "Design", "Product", "Software Engineering", "Customer Success"].map(category => (
              <li key={category}>
                <a
                  href="#"
                  className={selectedCategory === category ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="categories-select">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {["all", "Design", "Product", "Software Engineering", "Customer Success"].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="date-desc">Дата (нові)</option>
          <option value="date-asc">Дата (старі)</option>
          <option value="title-asc">Назва (А-Z)</option>
          <option value="title-desc">Назва (Z-A)</option>
        </select>
      </nav>

      <section className="cards">
        {currentCards.map((card) => (
          <div key={card.id} className="card">
            <Link to={`/cards/${card.id}`} className="card-link">
              <h3>{getDisplayTitle(card.title)}</h3>
              <p>{card.description}</p>
              <p>
                <strong>{card.author}</strong> - {card.date}
              </p>
              <div className="card-category">
                <strong>Категорії: </strong>{card.categories.join(', ')}
              </div>
            </Link>
          </div>
        ))}
      </section>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <header>
        <div className="logo">Untitled UI</div>
        <button
          className="menu-toggle"
          aria-label="Відкрити меню"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>Products</Link>
            </li>
            <li>
              <a href="#" onClick={() => setMenuOpen(false)}>Services</a>
            </li>
            <li>
              <a href="#" onClick={() => setMenuOpen(false)}>Pricing</a>
            </li>
            <li>
              <a href="#" onClick={() => setMenuOpen(false)}>Resources</a>
            </li>
            <li>
              <a href="#" onClick={() => setMenuOpen(false)}>About</a>
            </li>
            <li>
              <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
            </li>
          </ul>
        </nav>
        <div className="buttons">
          <button className="login">Log in</button>
          <button className="signup">Sign up</button>
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="blog-section">
                  <h3>Our blog</h3>
                  <h1>The latest writings from our team</h1>
                  <p>
                    The latest industry news, interviews, technologies, and resources.
                  </p>
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Search by title"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </section>
                <Cards searchQuery={searchQuery} />
              </>
            }
          />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/cards/:id" element={<CardDetail />} />
        </Routes>
      </main>
      <footer>
        <div className="newsletter">
          <h2>Join our newsletter</h2>
          <p>We’ll send you a nice letter once per week. No spam.</p>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
        <div className="footer-links">
        </div>
        <div className="footer-bottom">
          <div className="logo">Untitled UI</div>
          <p>© 2077 Untitled UI. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
};

export default App;

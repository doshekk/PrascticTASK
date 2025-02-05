import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Додаємо імпорт Link для навігації
import cardsData from './cardsData';

// Функція для видалення частини заголовку до символу ":"
const getDisplayTitle = (fullTitle) => {
  const parts = fullTitle.split(':');
  return parts.length > 1 ? parts.slice(1).join(':').trim() : fullTitle;
};

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("date-desc");
  const cardsPerPage = 17; // 1 велика картка + 16 звичайних карток (8 рядків по 2 картки)

  // Фільтрація карток за категорією
  const filteredCards = cardsData.filter(card => {
    if (selectedCategory === "all") return true;
    return card.categories.includes(selectedCategory);
  });

  // Сортування карток
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortOption === "date-desc") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === "title-asc") {
      return getDisplayTitle(a.title).localeCompare(getDisplayTitle(b.title));
    } else if (sortOption === "title-desc") {
      return getDisplayTitle(b.title).localeCompare(getDisplayTitle(a.title));
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = sortedCards.slice(startIndex, startIndex + cardsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="main-content">
      <nav className="category-nav">
        <ul>
          {["all", "Design", "Product", "Software Engineering", "Customer Success", "Leadership", "Management"].map(category => (
            <li key={category}>
              <a
                href="#"
                className={selectedCategory === category ? "category-link active" : "category-link"}
                data-category={category}
                onClick={(e) => { e.preventDefault(); handleCategoryClick(category); }}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="cards-section">
        <section className="cards">
          {currentCards.length > 0 && (
            <div className="large-card">
              <Link to={`/cards/${currentCards[0].id}`} className="card-link">
                <div className="card-image">
                  <img src={currentCards[0].image} alt={currentCards[0].title} />
                </div>
                <h3>{getDisplayTitle(currentCards[0].title)}</h3>
                <p>{currentCards[0].description}</p>
                <p>
                  <strong>{currentCards[0].author}</strong><br />
                  {currentCards[0].date}
                </p>
                <div className="card-category">
                  <strong>Категорії: </strong>{currentCards[0].categories.join(', ')}
                </div>
              </Link>
            </div>
          )}
          <div className="small-cards">
            {currentCards.slice(1).map((card) => (
              <div key={card.id} className="card small-card">
                <Link to={`/cards/${card.id}`} className="card-link">
                  <div className="card-image">
                    <img src={card.image} alt={card.title} />
                  </div>
                  <h3>{getDisplayTitle(card.title)}</h3>
                  <p>{card.description}</p>
                  <p>
                    <strong>{card.author}</strong><br />
                    {card.date}
                  </p>
                  <div className="card-category">
                    <strong>Категорії: </strong>{card.categories.join(', ')}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <div className="pagination">
          <button id="prevButton" onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
          <span id="pageIndicator">Page {currentPage}</span>
          <button id="nextButton" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Додаємо імпорт Link
import cardsData from './cardsData';
import './CategoriesPage.css'; // Імпортуємо стилі для сторінки категорій

const getDisplayTitle = (fullTitle) => {
  const parts = fullTitle.split(':');
  return parts.length > 1 ? parts.slice(1).join(':').trim() : fullTitle;
};

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9; // Максимально 9 карток на сторінку

  // Фільтрація карток за категорією та пошуковим запитом
  const filteredCards = cardsData.filter((card) => {
    const matchesCategory =
      selectedCategory === 'all' || card.categories.includes(selectedCategory);
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Обчислення загальної кількості сторінок
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  // Отримання карток для поточної сторінки
  const indexOfFirstCard = (currentPage - 1) * cardsPerPage;
  const indexOfLastCard = currentPage * cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="categories-page">
      {/* Заголовок сторінки */}
      <header className="categories-header">
        <h1>Categories</h1>
        <p>Discover articles by category</p>
      </header>

      <div className="categories-main">
        {/* Бічна панель з пошуком та категоріями */}
        <aside className="categories-sidebar">
          {/* Поле пошуку */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          {/* Список категорій */}
          <ul className="categories-list">
            {[
              'all',
              'Design',
              'Product',
              'Software Engineering',
              'Customer Success',
              'Leadership',
              'Management',
            ].map((category) => (
              <li key={category}>
                <a
                  href="#"
                  className={
                    selectedCategory === category
                      ? 'category-link active'
                      : 'category-link'
                  }
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
        </aside>

        {/* Секція з картками */}
        <div className="categories-content">
          <div className="categories-cards">
            {currentCards.length === 0 ? (
              <p>No articles found for your search.</p>
            ) : (
              <>
                {/* Велика картка */}
                {currentCards.length > 0 && (
                  <div className="card large-card">
                    <Link to={`/cards/${currentCards[0].id}`} className="card-link">
                      <h3>{getDisplayTitle(currentCards[0].title)}</h3>
                      <p>{currentCards[0].description}</p>
                      <p>
                        <strong>{currentCards[0].author}</strong> -{' '}
                        {currentCards[0].date}
                      </p>
                      <div className="card-category">
                        <strong>Category: </strong>
                        {currentCards[0].categories.join(', ')}
                      </div>
                    </Link>
                  </div>
                )}
                {/* Менші картки */}
                <div className="small-cards">
                  {currentCards.slice(1).map((card) => (
                    <div key={card.id} className="card small-card">
                      <Link to={`/cards/${card.id}`} className="card-link">
                        <h3>{getDisplayTitle(card.title)}</h3>
                        <p>{card.description}</p>
                        <p>
                          <strong>{card.author}</strong> - {card.date}
                        </p>
                        <div className="card-category">
                          <strong>Category: </strong>
                          {card.categories.join(', ')}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {/* Пагінація */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

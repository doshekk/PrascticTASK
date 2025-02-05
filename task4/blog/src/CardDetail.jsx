import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import cardsData from './cardsData';
import './CardDetail.css';

// Функція для видалення частини заголовку до символу ":"
const getDisplayTitle = (fullTitle) => {
  const parts = fullTitle.split(':');
  return parts.length > 1 ? parts.slice(1).join(':').trim() : fullTitle;
};

const CardDetail = () => {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recentCards, setRecentCards] = useState([]);
  const [recentPage, setRecentPage] = useState(1);
  const cardsPerPage = 6;
  const recentCardsPerPage = 4; // Кількість недавно переглянутих карток на сторінку

  // Знаходимо картку з відповідним ID
  const card = cardsData.find((card) => card.id === parseInt(id));

  useEffect(() => {
    if (card) {
      // Оновлюємо недавно переглянуті картки
      setRecentCards((prevCards) => {
        const updatedCards = prevCards.filter((c) => c.id !== card.id);
        updatedCards.unshift(card);
        return updatedCards.slice(0, 10); // Зберігаємо останні 10 переглянутих карток
      });
    }
  }, [card]);

  if (!card) {
    return (
      <div className="card-detail">
        <p>Картку не знайдено.</p>
        <Link to="/" className="back-link">← Назад на головну</Link>
      </div>
    );
  }

  // Обробка відправлення форми
  const handleSubmit = (e) => {
    e.preventDefault();
    // Логіка відправлення електронної пошти
    console.log(`Email submitted: ${email}`);
    // Очистити поле вводу після відправки
    setEmail('');
  };

  // Обчислення кількості сторінок
  const totalPages = Math.ceil(cardsData.length / cardsPerPage);
  
  // Отримання карток для поточної сторінки
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cardsData.slice(startIndex, startIndex + cardsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Обчислення кількості сторінок недавно переглянутих карток
  const totalRecentPages = Math.ceil(recentCards.length / recentCardsPerPage);
  
  // Отримання карток для поточної сторінки недавно переглянутих карток
  const recentStartIndex = (recentPage - 1) * recentCardsPerPage;
  const currentRecentCards = recentCards.slice(recentStartIndex, recentStartIndex + recentCardsPerPage);

  const handlePrevRecentPage = () => {
    if (recentPage > 1) {
      setRecentPage(recentPage - 1);
    }
  };

  const handleNextRecentPage = () => {
    if (recentPage < totalRecentPages) {
      setRecentPage(recentPage + 1);
    }
  };

  return (
    <div className="card-detail-page">
      {/* Верхній блок з заголовком та формою */}
      <div className="top-section">
        <h1 className="top-heading">Підпишіться на наші оновлення</h1>
        <p className="top-subtext">Будьте в курсі останніх новин та статей</p>
        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Введіть вашу електронну пошту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Підписатися</button>
        </form>
        <p className="form-note">Ми поважаємо вашу конфіденційність. Без спаму.</p>
      </div>

      {/* Основний контент деталізації картки */}
      <div className="card-detail">
        <Link to="/" className="back-link">← Назад на головну</Link>
        <h2>{card.title}</h2>
        <p className="author-date">
          <strong>{card.author}</strong> - {card.date}
        </p>
        <div className="image-container">
          <img src={card.image} alt={card.title} />
        </div>
        <p className="description">{card.description}</p>
        <p>
          <strong>Категорії:</strong> {card.categories.join(', ')}
        </p>
      </div>

      {/* Нижній блок під деталями картки */}
      <div className="bottom-section">
        <h3 className="bottom-heading">Можливо, вам також сподобається</h3>
        <div className="bottom-cards">
          {currentCards.map((item) => (
            <div key={item.id} className="bottom-card">
              <Link to={`/cards/${item.id}`} className="bottom-card-link">
                <div className="bottom-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <h4>{getDisplayTitle(item.title)}</h4>
                <p>{item.description}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="pagination-section">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Попередня</button>
          <span>Сторінка {currentPage} з {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Наступна</button>
        </div>
      </div>

      {/* Блок з недавно переглянутими картками */}
      <div className="recent-section">
        <h3 className="recent-heading">Недавно переглянуті картки</h3>
        <div className="recent-cards-container">
          <button className="recent-arrow" onClick={handlePrevRecentPage} disabled={recentPage === 1}>←</button>
          <div className="recent-cards">
            {currentRecentCards.map((item) => (
              <div key={item.id} className="recent-card">
                <Link to={`/cards/${item.id}`} className="recent-card-link">
                  <div className="recent-card-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <h4>{getDisplayTitle(item.title)}</h4>
                </Link>
              </div>
            ))}
          </div>
          <button className="recent-arrow" onClick={handleNextRecentPage} disabled={recentPage === totalRecentPages}>→</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;

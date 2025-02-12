import React from 'react';
import ReactDOM from 'react-dom/client'; // Змінився імпорт
import App from './App';
import './index.css';

// Створюємо корінь додатку
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеримо додаток
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
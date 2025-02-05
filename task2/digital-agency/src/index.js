import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Рендеримо головний компонент у DOM-елемент з id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

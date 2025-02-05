import React, { useState } from 'react';
import colorPalettes from '../data/colorPalettes.json'; // Імпорт даних
import './Palettes.css';
import notifySound from '../assets/src_notify.mp3'; // Імпорт звуку

const Palettes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPalette, setSelectedPalette] = useState(null);

    const openModal = (palette) => {
        setSelectedPalette(palette);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPalette(null);
        setIsModalOpen(false);
    };

    // Функція для копіювання всіх кольорів
    const copyAllColors = () => {
        if (selectedPalette) {
            // Формуємо текст для копіювання (усі кольори через кому)
            const colorsText = selectedPalette.colors
                .map(color => color.color)
                .join(', ');

            // Копіюємо текст у буфер обміну
            navigator.clipboard.writeText(colorsText)
                .then(() => {
                    console.log('Кольори скопійовано:', colorsText);
                    // Програємо звук
                    const audio = new Audio(notifySound);
                    audio.play();
                })
                .catch((err) => {
                    console.error('Помилка копіювання:', err);
                });
        }
    };

    return (
        <section id="palettes">
            <h2>Виберіть палітру</h2>
            <div id="palette-container">
                {colorPalettes.map(palette => (
                    <div key={palette.id} className="palette" onClick={() => openModal(palette)}>
                        <h3>{palette.paletteName}</h3>
                        <div className="colors">
                            {palette.colors.slice(0, 5).map((color, index) => (
                                <div key={index} className="color" style={{ backgroundColor: color.color }}>
                                    <span>{color.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div id="palette-modal" className={`modal ${isModalOpen ? 'open' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2 id="modal-title">{selectedPalette?.paletteName}</h2>
                    <div id="modal-color-options">
                        {selectedPalette?.colors.map((color, index) => (
                            <div key={index} className="color" style={{ backgroundColor: color.color }}>
                                <span>{color.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Кнопка для копіювання всіх кольорів */}
                    <button className="copy-button" onClick={copyAllColors}>
                        Копіювати всі кольори
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Palettes;
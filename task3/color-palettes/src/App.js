import React from 'react';
import Header from './components/Header';
import Palettes from './components/Palettes';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <Palettes />
            </main>
            <Footer />
        </div>
    );
}

export default App;
import { useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import ComicPanel from './components/ComicPanel';
import ComicCard from './components/ComicCard';
import Footer from './components/Footer';
import { FaColumns, FaList } from "react-icons/fa";
import './App.css';
import type { Comic } from './types/Comic';

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'row'>('row');
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);

  return (
    <div className="app">
      <Header onComicSelect={setSelectedComic} />
      <MenuBar />

      <main className="main-content">
        <div className="view-switch">
          <button
            className={`switch-icon ${viewMode === 'row' ? 'active' : ''}`}
            onClick={() => setViewMode('row')}
            title="Vista por fila"
          >
            <FaList />
          </button>
          <button
            className={`switch-icon ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Vista de cuadrícula"
          >
            <FaColumns />
          </button>
        </div>

        {/* Si hay un cómic seleccionado, lo muestra, si no, muestra todo el panel */}
        {selectedComic ? (
          <div style={{ padding: '20px' }}>
            <ComicCard comic={selectedComic} viewMode={viewMode} />
          </div>
        ) : (
          <ComicPanel viewMode={viewMode} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

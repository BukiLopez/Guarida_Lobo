import { useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import ComicPanel from './components/ComicPanel';
import Footer from './components/Footer';
import { FaColumns, FaList } from "react-icons/fa";
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'row'>('row');

  return (
    <div className="app">
      <Header />
      <MenuBar />

      <main className="main-content">
        {/* Botón para cambiar de modo */}
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

        {/* Panel que recibe el modo */}
        <ComicPanel viewMode={viewMode} />
      </main>

      <Footer />
    </div>
  );
}

export default App;

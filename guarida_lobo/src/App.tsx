import { useState } from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import ComicPanel from './components/ComicPanel';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'row'>('row');

  return (
    <div className="app">
      <Header />
      <MenuBar />

      <main className="main-content">
        {/* Botón para cambiar de modo */}
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button onClick={() => setViewMode(v => v === 'row' ? 'grid' : 'row')}>
            Cambiar a vista {viewMode === 'row' ? 'cuadrícula' : 'por fila'}
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

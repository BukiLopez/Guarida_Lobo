import './ComicPanel.css';
import ComicCard from './ComicCard';
import { useEffect, useState } from 'react';
import type { Comic } from '../types/Comic';

interface ComicPanelProps {
  viewMode: 'grid' | 'row';
}

const ComicPanel: React.FC<ComicPanelProps> = ({ viewMode }) => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/get')
      .then((res) => res.json())
      .then((data) => setComics(data))
      .catch((err) => console.error('Error al cargar los cómics:', err));
  }, []);

  return (
    <div className={`comic-panel ${viewMode === 'grid' ? 'grid-view' : 'row-view'}`}>
      {comics.map((comic, i) => (
        console.log(`Comic #${i}:`, comic),
        <ComicCard key={comic.id} comic={comic} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default ComicPanel;

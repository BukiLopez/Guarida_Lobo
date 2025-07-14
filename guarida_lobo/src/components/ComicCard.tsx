import './ComicCard.css';
import type { Comic } from '../types/Comic';
import RelatedComics from './RelatedComics';
import React, {useEffect, useState } from 'react';

interface ComicCardProps {
  comic: Comic;
  viewMode: 'grid' | 'row';
}

const ComicCard: React.FC<ComicCardProps> = ({ comic, viewMode }) => {
  const [related, setRelated] = useState<Comic[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/related/${comic.id}`)
    .then((res) => res.json())
    .then((data) => setRelated(data))
    .catch(err => {
      console.error('Error al cargar cómics relacionados:', err);
      setRelated([]);
    });
  }, [comic.id]);
  return (
    <div className={`comic-card ${viewMode}`}>
        <div className="comic-image-column">
            <img className="comic-image" src={comic.portada_url} alt={comic.nombre} />
        </div>

        <div className="comic-main-content">
            <div className="comic-details">
            <h2 className="comic-title">{comic.nombre}</h2>
            <p className="comic-price">${comic.precio.toFixed(2)}</p>
            <p className="comic-description">{comic.descripcion}</p>
            </div>

            <div className="comic-related-column">
            <RelatedComics related={related} />
            </div>
        </div>
    </div>

  );
};

export default ComicCard;

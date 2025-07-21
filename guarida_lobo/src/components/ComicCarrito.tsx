import './ComicCard.css';
import type { Comic } from '../types/Comic';
import React, { useEffect, useState } from 'react';

interface ComicCardProps {
  comic: Comic;
  viewMode: 'grid' | 'row';
}

const ComicCard: React.FC<ComicCardProps> = ({ comic, viewMode }) => {

  useEffect(() => {
    fetch(`http://localhost:3001/api/related/${comic.id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.error('Error al cargar cómics relacionados:', err);
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
      </div>
    </div>
  );
};

export default ComicCard;

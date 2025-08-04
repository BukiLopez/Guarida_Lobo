import './ComicCarrito.css';
import type { Comic } from '../types/Comic';
import React, { useEffect } from 'react';

interface ComicCardProps {
  comic: Comic & { cantidad: number };
  viewMode: 'grid' | 'row';
  onDelete: () => void;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic, viewMode, onDelete }) => {
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
          <p className="comic-price">Precio: ${comic.precio.toFixed(2)}</p>
          <p className="comic-cantidad">Cantidad: {comic.cantidad}</p>
          <p className="comic-total">Subtotal: ${(comic.precio * comic.cantidad).toFixed(2)}</p>
          <p className="comic-description">{comic.descripcion}</p>
          <button className="btn-eliminar" onClick={onDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
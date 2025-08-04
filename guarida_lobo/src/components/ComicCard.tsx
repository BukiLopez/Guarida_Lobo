import './ComicCard.css';
import type { Comic } from '../types/Comic';
import RelatedComics from './RelatedComics';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ComicCardProps {
  comic: Comic;
  viewMode: 'grid' | 'row';
}

const ComicCard: React.FC<ComicCardProps> = ({ comic, viewMode }) => {
  const [related, setRelated] = useState<Comic[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/related/${comic.id}`)
      .then((res) => res.json())
      .then((data) => setRelated(data))
      .catch((err) => {
        console.error('Error al cargar cómics relacionados:', err);
        setRelated([]);
      });
  }, [comic.id]);

  const agregarAlCarrito = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comic_id: comic.id }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Agregado al carrito');
      } else {
        setMensaje(data.message || 'Error al agregar al carrito');
      }
    } catch (error) {
      setMensaje('Error en el servidor');
    }

    setTimeout(() => setMensaje(null), 3000);
  };

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
          <button onClick={agregarAlCarrito}>Agregar al carrito</button>
          {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
        </div>

        <div className="comic-related-column">
          <RelatedComics related={related} />
        </div>
      </div>
    </div>
  );
};

export default ComicCard;

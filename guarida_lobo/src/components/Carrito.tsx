import './Carrito.css';
import React, { useEffect, useState } from 'react';
import ComicCard from './ComicCarrito';
import type { Comic } from '../types/Comic';

interface ComicEnCarrito extends Comic {
  cantidad: number;
}

const CarritoPanel: React.FC<{ viewMode: 'grid' | 'row' }> = ({ viewMode }) => {
  const [carrito, setCarrito] = useState<ComicEnCarrito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }

    fetch('http://localhost:3001/api/carrito', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setCarrito(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar el carrito');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="comic-panel">
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        carrito.map(comic => (
          <ComicCard key={comic.id} comic={comic} viewMode={viewMode} />
        ))
      )}
    </div>
  );
};

export default CarritoPanel;

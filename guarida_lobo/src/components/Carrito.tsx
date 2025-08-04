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
  const [total, setTotal] = useState(0);

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
        const totalCalculado = data.reduce((acc: number, comic: ComicEnCarrito) => acc + comic.precio * comic.cantidad, 0);
        setTotal(totalCalculado);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar el carrito');
        setLoading(false);
      });
  }, []);

  const eliminarComic = (comicId: string) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3001/api/carrito/${comicId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setCarrito(prev => prev.filter(c => c.id !== comicId)));
  };

  const hacerCompra = () => {
    alert('Compra realizada (simulado)');
    setCarrito([]);
  };

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="carrito-container">
      <div className="comic-panel">
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          carrito.map(comic => (
            <ComicCard key={comic.id} comic={comic} viewMode={viewMode} onDelete={() => eliminarComic(comic.id)} />
          ))
        )}
      </div>
      {carrito.length > 0 && (
        <div className="resumen-compra">
          <p>Total: <strong>${total.toFixed(2)}</strong></p>
          <button className="btn-comprar" onClick={hacerCompra}>Hacer compra</button>
        </div>
      )}
    </div>
  );
};

export default CarritoPanel;
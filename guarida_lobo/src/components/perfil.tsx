import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css'; // Asegúrate de importar tu CSS

export default function Perfil() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3001/api/perfil', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async res => {
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h2>Bienvenido, {user.nombre}</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
}

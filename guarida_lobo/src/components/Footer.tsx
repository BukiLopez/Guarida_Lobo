import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-column">
      <h4>Servicio al Cliente</h4>
      <p>Nosotros</p>
      <p>Métodos de Pago</p>
      <p>Pedidos Especiales</p>
      <p>Contacto</p>
      <p>Preguntas Frecuentes</p>
      <p>Pre-ventas</p>
    </div>
    <div className="footer-column">
      <h4>Síguenos</h4>
      <div className="social-icons">
        <span>🟢</span>
        <span>🎵</span>
        <span>📷</span>
      </div>
    </div>
    <div className="footer-column">
      <h4>Términos y Condiciones</h4>
      <p>Aviso de Privacidad</p>
      <p>Política de Devoluciones</p>
      <p>Política de Envíos</p>
    </div>
  </footer>
);

export default Footer;
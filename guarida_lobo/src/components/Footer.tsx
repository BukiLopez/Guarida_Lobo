import { FaWhatsappSquare, FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-column">
      <h4>Servicio al cliente</h4>
      <p>Nosotros</p>
      <p>Métodos de pago</p>
      <p>Pedidos especiales</p>
      <p>Contacto</p>
      <p>Preguntas frecuentes</p>
      <p>Pre-ventas</p>
    </div>
    <div className="footer-column">
      <h4>Síguenos</h4>
      <div className="social-icons">
        <span className="whatsapp"><FaWhatsappSquare /></span>
        <span className="tiktok"><AiFillTikTok /></span>
        <span className="instagram"><FaInstagramSquare /></span>
      </div>
    </div>
    <div className="footer-column">
      <h4>Términos y condiciones</h4>
      <p>Aviso de privacidad</p>
      <p>Política de devoluciones</p>
      <p>Política de envíos</p>
    </div>
  </footer>
);

export default Footer;
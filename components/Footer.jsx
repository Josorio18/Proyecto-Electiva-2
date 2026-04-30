import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>UrbanStyle</h3>
                    <p>Tu tienda de ropa urbana de confianza</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                        Descubre la mejor selección de prendas urbanas con calidad premium y diseño exclusivo.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook" title="Facebook">f</a>
                        <a href="#" aria-label="Twitter" title="Twitter">𝕏</a>
                        <a href="#" aria-label="Instagram" title="Instagram">📷</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Navegación</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/hombres">Hombres</Link></li>
                        <li><Link to="/mujeres">Mujeres</Link></li>
                        <li><Link to="/accesorios">Accesorios</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Cuenta</h4>
                    <ul>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                        <li><Link to="/registro">Registrarse</Link></li>
                        <li><Link to="/carrito">Mi Carrito</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p style={{ fontSize: '0.9rem' }}>📧 info@urbanstyle.com</p>
                    <p style={{ fontSize: '0.9rem' }}>📞 +57 (1) 234-5678</p>
                    <p style={{ fontSize: '0.9rem' }}>📍 Bogotá, Colombia</p>
                </div>

                <div className="footer-section">
                    <h4>Información</h4>
                    <ul>
                        <li><a href="#">Términos y Condiciones</a></li>
                        <li><a href="#">Política de Privacidad</a></li>
                        <li><a href="#">Política de Devoluciones</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} UrbanStyle. Todos los derechos reservados.</p>
                <p>Hecho con ❤️ para ti</p>
            </div>
        </footer>
    );
};

export default Footer;

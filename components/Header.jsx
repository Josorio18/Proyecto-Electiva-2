
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <header>
            <div className="logo-container">
                <h1>UrbanStyle</h1>
            </div>
            <nav>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
                <Link to="/hombres" className={location.pathname === '/hombres' ? 'active' : ''}>Hombres</Link>
                <Link to="/mujeres">Mujeres</Link>
                <Link to="/accesorios">Accesorios</Link>
                <Link to="/carrito">Carrito</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    );
};

export default Header;

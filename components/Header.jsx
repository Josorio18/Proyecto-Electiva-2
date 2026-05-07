import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout, cartCount }) => {
    const location = useLocation();

    return (
        <header>
            <div className="logo-container">
                <h1>UrbanStyle</h1>
            </div>
            <nav>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
                <Link to="/hombres" className={location.pathname === '/hombres' ? 'active' : ''}>Hombres</Link>
                <Link to="/mujeres" className={location.pathname === '/mujeres' ? 'active' : ''}>Mujeres</Link>
                <Link to="/accesorios" className={location.pathname === '/accesorios' ? 'active' : ''}>Accesorios</Link>
                <Link to="/carrito" className={location.pathname === '/carrito' ? 'active' : ''}>
                    Carrito {cartCount > 0 && <span style={{ background: '#d4af37', color: 'black', padding: '2px 6px', borderRadius: '50%', fontSize: '0.8rem' }}>{cartCount}</span>}
                </Link>
                {user ? (
                    <>
                        <span className="user-welcome">Hola, {user.split('@')[0]}</span>
                        <button onClick={onLogout} className="logout-link" style={{ border: 'none', cursor: 'pointer' }}>Cerrar Sesión</button>
                    </>
                ) : (
                    <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;

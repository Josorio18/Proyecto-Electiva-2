import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout, cartCount }) => {
    const location = useLocation();

    return (
        <header>
            <div className="logo-container">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>UrbanStyle <span style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}>V2</span></h1>
                </Link>
            </div>
            <nav>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
                <Link to="/catalog" className={location.pathname.startsWith('/catalog') ? 'active' : ''}>Catálogo</Link>
                <Link to="/community" className={location.pathname === '/community' ? 'active' : ''}>Comunidad</Link>
                <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
                    Carrito {cartCount > 0 && <span style={{ background: 'var(--accent-color)', color: 'var(--primary-color)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold' }}>{cartCount}</span>}
                </Link>
                
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''} style={{ fontWeight: 'bold' }}>
                           {user.name.split(' ')[0]}
                        </Link>
                        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>
                        <button onClick={onLogout} className="logout-link" style={{ border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Salir</button>
                    </div>
                ) : (
                    <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Ingresar</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;


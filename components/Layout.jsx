import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ user, onLogout, cartCount }) => {
    return (
        <>
            <Header user={user} onLogout={onLogout} cartCount={cartCount} />

            <main className="main-content">
                <Outlet />
            </main>

            <Link to="/carrito" className="btn-ver-carrito">
                🛒
                {cartCount > 0 && <span style={{ position: 'absolute', top: '0', right: '0', background: '#d4af37', color: 'black', borderRadius: '50%', padding: '2px 6px', fontSize: '0.8rem', fontWeight: 'bold' }}>{cartCount}</span>}
            </Link>

            <Footer />
        </>
    );
};

export default Layout;

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
            <Header />

            <main className="main-content">
                <Outlet />
            </main>

            <Link to="/carrito" className="btn-ver-carrito">🛒</Link>

            <Footer />
        </>
    );
};

export default Layout;

// src/components/Layout.jsx
import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
            <Header />

            <main>
                { }
                <Outlet />
            </main>

            <Link to="/carrito" className="btn-ver-carrito">🛒</Link>

            <Footer />
        </>
    );
};

export default Layout;

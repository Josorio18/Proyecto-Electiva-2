import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import './App.css';

// Componente para mostrar carga
const Loading = () => (
    <div className="text-center" style={{ padding: '3rem' }}>
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
    </div>
);

// Páginas/Componentes principales
const Home = () => (
    <div className="text-center">
        <div className="hero-container">
            <div className="hero-overlay">
                <h2>Bienvenido a UrbanStyle</h2>
                <p>La mejor tienda de ropa urbana del momento</p>
            </div>
        </div>
        <div className="mt-2 mb-2">
            <p>Explora nuestras categorías: Hombres, Mujeres y Accesorios</p>
        </div>
    </div>
);

const ProductList = ({ category, products, loading }) => {
    if (loading) return <Loading />;
    
    const filteredProducts = category === 'accesorios' 
        ? products.filter(p => p.category === 'jewelery' || p.category === 'electronics')
        : products.filter(p => p.category === category);

    return (
        <div>
            <h2 className="text-center mb-2" style={{ textTransform: 'capitalize' }}>
                {category === 'men\'s clothing' ? 'Colección de Hombres' : 
                 category === 'women\'s clothing' ? 'Colección de Mujeres' : 
                 'Accesorios'}
            </h2>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

const Carrito = () => (
    <div className="text-center">
        <h2>Mi Carrito</h2>
        <p>Tu carrito está vacío. Comienza a comprar ahora.</p>
    </div>
);

const Login = () => (
    <div className="text-center">
        <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            maxWidth: '400px',
            margin: '2rem auto',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ color: '#d4af37' }}>Inicia Sesión</h2>
            <form>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Correo Electrónico:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                <button type="submit" className="buy-button">Iniciar Sesión</button>
                <p style={{ marginTop: '1rem' }}>
                    ¿No tienes cuenta? <a href="/registro" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}>Regístrate aquí</a>
                </p>
            </form>
        </div>
    </div>
);

const Registro = () => (
    <div className="text-center">
        <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            maxWidth: '400px',
            margin: '2rem auto',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ color: '#d4af37' }}>Crear Cuenta</h2>
            <form>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Nombre:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Correo Electrónico:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>
                <button type="submit" className="buy-button">Registrarse</button>
                <p style={{ marginTop: '1rem' }}>
                    ¿Ya tienes cuenta? <a href="/login" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}>Inicia sesión aquí</a>
                </p>
            </form>
        </div>
    </div>
);

const NotFound = () => (
    <div className="text-center">
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe.</p>
    </div>
);

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="hombres" element={
                        <ProductList category="men's clothing" products={products} loading={loading} />
                    } />
                    <Route path="mujeres" element={
                        <ProductList category="women's clothing" products={products} loading={loading} />
                    } />
                    <Route path="accesorios" element={
                        <ProductList category="accesorios" products={products} loading={loading} />
                    } />
                    <Route path="carrito" element={<Carrito />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registro" element={<Registro />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
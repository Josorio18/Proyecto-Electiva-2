import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import './App.css';

// Utilidad para traducir términos comunes de la API
const translateProduct = (product) => {
    const translations = {
        "men's clothing": "Ropa de Hombre",
        "women's clothing": "Ropa de Mujer",
        "jewelery": "Joyería",
        "electronics": "Electrónica"
    };

    // Traducciones simples para títulos comunes de la API
    let translatedTitle = product.title
        .replace(/Mens /g, "Hombre - ")
        .replace(/Women's /g, "Mujer - ")
        .replace(/Cotton /g, "Algodón ")
        .replace(/Jacket/g, "Chaqueta")
        .replace(/Backpack/g, "Mochila")
        .replace(/Casual/g, "Casual")
        .replace(/Slim Fit/g, "Corte Ajustado")
        .replace(/Shirt/g, "Camisa")
        .replace(/T-Shirt/g, "Camiseta")
        .replace(/Gold/g, "Oro")
        .replace(/Silver/g, "Plata")
        .replace(/Bracelet/g, "Pulsera")
        .replace(/Ring/g, "Anillo");

    return {
        ...product,
        displayCategory: translations[product.category] || product.category,
        displayTitle: translatedTitle
    };
};

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

const ProductList = ({ category, products, loading, onAddToCart }) => {
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
                {filteredProducts.map(product => {
                    const translated = translateProduct(product);
                    return (
                        <ProductCard 
                            key={product.id} 
                            product={{...product, title: translated.displayTitle}} 
                            onAddToCart={() => onAddToCart(product)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const Carrito = ({ cart, onRemove, onClear }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = () => {
        if (cart.length === 0) return alert("Tu carrito está vacío");
        alert("¡Gracias por tu compra! Tu pedido está en camino.");
        onClear();
    };

    return (
        <div className="text-center">
            <h2>Mi Carrito</h2>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío. Comienza a comprar ahora.</p>
            ) : (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="product-grid">
                        {cart.map((item, index) => (
                            <div key={index} className="product-card" style={{ padding: '1rem' }}>
                                <h4>{translateProduct(item).displayTitle}</h4>
                                <p className="price">${item.price}</p>
                                <button 
                                    className="buy-button" 
                                    style={{ background: '#ff4757' }}
                                    onClick={() => onRemove(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '2rem', borderTop: '2px solid #ddd', paddingTop: '1rem' }}>
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <button className="buy-button" onClick={handleCheckout} style={{ padding: '1rem 3rem' }}>
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de login exitoso
        onLogin(email);
    };

    return (
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
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            Correo Electrónico:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
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
};

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
            <form onSubmit={(e) => { e.preventDefault(); alert("Cuenta creada exitosamente"); window.location.href='/login'; }}>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Nombre:
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Correo Electrónico:
                    </label>
                    <input
                        type="email"
                        id="email-reg"
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        id="password-reg"
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
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
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [user, setUser] = useState(() => localStorage.getItem('currentUser'));

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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        alert(`¡${translateProduct(product).displayTitle} añadido al carrito!`);
    };

    const handleRemoveFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const handleLogin = (email) => {
        localStorage.setItem('currentUser', email);
        setUser(email);
        alert(`¡Bienvenido de nuevo, ${email}!`);
        window.location.href = '/';
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        alert("Has cerrado sesión");
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout user={user} onLogout={handleLogout} cartCount={cart.length} />}>
                    <Route index element={<Home />} />
                    <Route path="hombres" element={
                        <ProductList 
                            category="men's clothing" 
                            products={products} 
                            loading={loading} 
                            onAddToCart={handleAddToCart}
                        />
                    } />
                    <Route path="mujeres" element={
                        <ProductList 
                            category="women's clothing" 
                            products={products} 
                            loading={loading} 
                            onAddToCart={handleAddToCart}
                        />
                    } />
                    <Route path="accesorios" element={
                        <ProductList 
                            category="accesorios" 
                            products={products} 
                            loading={loading} 
                            onAddToCart={handleAddToCart}
                        />
                    } />
                    <Route path="carrito" element={
                        <Carrito 
                            cart={cart} 
                            onRemove={handleRemoveFromCart} 
                            onClear={() => setCart([])} 
                        />
                    } />
                    <Route path="login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
                    <Route path="registro" element={user ? <Navigate to="/" /> : <Registro />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layaout';
import './App.css';

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

const Hombres = () => (
    <div>
        <h2 className="text-center mb-2">Colección de Hombres</h2>
        <p className="text-center">Descubre nuestras prendas exclusivas para hombres</p>
        <div className="product-grid">
            <div className="product-card">
                <h3>Camiseta Urban</h3>
                <p className="price">$29.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
            <div className="product-card">
                <h3>Pantalón Casual</h3>
                <p className="price">$49.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
            <div className="product-card">
                <h3>Chaqueta Denim</h3>
                <p className="price">$79.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
        </div>
    </div>
);

const Mujeres = () => (
    <div>
        <h2 className="text-center mb-2">Colección de Mujeres</h2>
        <p className="text-center">Encuentra los mejores estilos para mujeres</p>
        <div className="product-grid">
            <div className="product-card">
                <h3>Blusa Elegante</h3>
                <p className="price">$34.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
            <div className="product-card">
                <h3>Falda Fashion</h3>
                <p className="price">$54.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
            <div className="product-card">
                <h3>Vestido Casual</h3>
                <p className="price">$64.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
        </div>
    </div>
);

const Accesorios = () => (
    <div>
        <h2 className="text-center mb-2">Accesorios</h2>
        <p className="text-center">Complementa tu estilo con nuestros accesorios</p>
        <div className="product-grid">
            <div className="product-card">
                <h3>Gorro Urban</h3>
                <p className="price">$14.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
            <div className="product-card">
                <h3>Bufanda Premium</h3>
                <p className="price">$19.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
            <div className="product-card">
                <h3>Mochila Estilo</h3>
                <p className="price">$44.99</p>
                <button className="buy-button">Añadir al Carrito</button>
            </div>
        </div>
    </div>
);

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
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="hombres" element={<Hombres />} />
                    <Route path="mujeres" element={<Mujeres />} />
                    <Route path="accesorios" element={<Accesorios />} />
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
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { storageService } from './services/storageService';

// Import Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Admin from './pages/Admin';

import './App.css';

function App() {
    const [cart, setCart] = useState(() => storageService.getCart());
    const [user, setUser] = useState(() => storageService.getCurrentUser());

    useEffect(() => {
        storageService.saveCart(cart);
    }, [cart]);

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        // Simple notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerText = '¡Añadido al carrito!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    };

    const handleRemoveFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        storageService.logout();
        setUser(null);
    };

    const handleUserUpdate = (updatedData) => {
        setUser(updatedData);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout user={user} onLogout={handleLogout} cartCount={cart.length} />}>
                    <Route index element={<Home />} />
                    
                    {/* Catalog Views (Counts as multiple views if category changes) */}
                    <Route path="catalog" element={<Catalog onAddToCart={handleAddToCart} />} />
                    <Route path="catalog/:category" element={<Catalog onAddToCart={handleAddToCart} />} />
                    
                    <Route path="community" element={<Community />} />
                    
                    <Route path="cart" element={
                        <Cart 
                            cart={cart} 
                            onRemove={handleRemoveFromCart} 
                            onClear={() => setCart([])} 
                        />
                    } />
                    
                    {/* User Profile View (Edit) */}
                    <Route path="profile" element={user ? <Profile user={user} onUserUpdate={handleUserUpdate} /> : <Navigate to="/login" />} />
                    
                    {/* Admin View (Delete) */}
                    <Route path="admin" element={user ? <Admin /> : <Navigate to="/login" />} />
                    
                    <Route path="login" element={user ? <Navigate to="/" /> : <Login onLoginSuccess={handleLogin} />} />
                    <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
                    
                    <Route path="*" element={<div className="text-center"><h2>404</h2><p>Página no encontrada</p></div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
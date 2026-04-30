import React from 'react';

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <header>
      <div className="logo-container">
        <h1>UrbanStyle</h1>
      </div>
      <nav>
        <a href="/" className="active">Inicio</a>
        <a href="/hombres">Hombres</a>
        <a href="/mujeres">Mujeres</a>
        <a href="/accesorios">Accesorios</a>
        <a href="/carrito">Carrito</a>
        
        {userName ? (
          <>
            <span className="user-welcome">👤 {userName}</span>
            <a href="#" className="logout-link" onClick={(e) => {
              e.preventDefault();
              onLogout?.();
            }}>Salir</a>
          </>
        ) : (
          <a href="/login">Login</a>
        )}
      </nav>
    </header>
  );
};

export default Header;

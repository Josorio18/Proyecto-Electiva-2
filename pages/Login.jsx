import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = storageService.login(email, password);
    if (user) {
      onLoginSuccess(user);
      navigate('/');
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <div className="auth-view">
      <div className="card" style={{ maxWidth: '450px', margin: '2rem auto', padding: '2.5rem' }}>
        <h2 className="text-center" style={{ color: 'var(--accent-color)' }}>Bienvenido</h2>
        <p className="text-center mb-2">Ingresa a tu cuenta UrbanStyle</p>
        
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: '#ff4757', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          
          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Correo Electrónico</label>
            <input 
              type="email" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Contraseña</label>
            <input 
              type="password" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="buy-button" style={{ width: '100%', margin: '1rem 0' }}>
            Iniciar Sesión
          </button>
          
          <p className="text-center mt-2">
            ¿Aún no tienes cuenta? <Link to="/register" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

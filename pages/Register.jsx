import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storageService.saveUser(formData);
    alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="auth-view">
      <div className="card" style={{ maxWidth: '500px', margin: '2rem auto', padding: '2.5rem' }}>
        <h2 className="text-center" style={{ color: 'var(--accent-color)' }}>Únete a Nosotros</h2>
        <p className="text-center mb-2">Crea tu cuenta de UrbanStyle</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre Completo</label>
            <input 
              name="name"
              type="text" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Correo Electrónico</label>
            <input 
              name="email"
              type="email" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Contraseña</label>
            <input 
              name="password"
              type="password" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Dirección de Envío</label>
            <input 
              name="address"
              type="text" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="buy-button" style={{ width: '100%', margin: '1rem 0' }}>
            Registrarme
          </button>
          
          <p className="text-center mt-2">
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Inicia Sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

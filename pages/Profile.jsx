import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const Profile = ({ user, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = storageService.saveUser(formData);
    onUserUpdate(updatedUser);
    setEditing(false);
    alert('Perfil actualizado correctamente');
  };

  if (!user) return <p className="text-center">Cargando perfil...</p>;

  return (
    <div className="profile-view">
      <div className="card" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--accent-color)', margin: 0 }}>Mi Perfil</h2>
            <button 
                onClick={() => setEditing(!editing)}
                className="buy-button" 
                style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
                {editing ? 'Cancelar' : 'Editar Datos'}
            </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre Completo</label>
            <input 
              name="name"
              type="text" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', background: editing ? 'white' : '#f0f0f0' }}
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>
          
          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Correo Electrónico (ID)</label>
            <input 
              name="email"
              type="email" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', background: '#f0f0f0' }}
              value={formData.email}
              disabled={true} // Email should be unique ID
            />
          </div>
          
          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Contraseña</label>
            <input 
              name="password"
              type="password" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', background: editing ? 'white' : '#f0f0f0' }}
              value={formData.password}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>

          <div className="form-group mb-2">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Dirección de Envío</label>
            <input 
              name="address"
              type="text" 
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', background: editing ? 'white' : '#f0f0f0' }}
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          
          {editing && (
            <button type="submit" className="buy-button" style={{ width: '100%', margin: '1rem 0' }}>
              Guardar Cambios
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;

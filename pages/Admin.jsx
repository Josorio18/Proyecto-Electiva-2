import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(storageService.getUsers());
  }, []);

  const handleDelete = (email) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${email}?`)) {
        storageService.deleteUser(email);
        setUsers(storageService.getUsers());
        alert('Usuario eliminado correctamente');
    }
  };

  return (
    <div className="admin-view">
      <h2 className="text-center mb-2">Administración de Usuarios</h2>
      <div className="card" style={{ padding: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--accent-color)', textAlign: 'left' }}>
              <th style={{ padding: '1rem' }}>Nombre</th>
              <th style={{ padding: '1rem' }}>Email</th>
              <th style={{ padding: '1rem' }}>Dirección</th>
              <th style={{ padding: '1rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
                <tr>
                    <td colSpan="4" className="text-center" style={{ padding: '2rem' }}>No hay usuarios registrados</td>
                </tr>
            ) : (
                users.map((u, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '1rem' }}>{u.name}</td>
                        <td style={{ padding: '1rem' }}>{u.email}</td>
                        <td style={{ padding: '1rem' }}>{u.address || 'N/A'}</td>
                        <td style={{ padding: '1rem' }}>
                            <button 
                                onClick={() => handleDelete(u.email)}
                                style={{ background: '#ff4757', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: '2rem', opacity: 0.6, fontSize: '0.8rem' }} className="text-center">
        * Nota: Al eliminar un usuario, sus datos se borrarán permanentemente del localStorage.
      </p>
    </div>
  );
};

export default Admin;

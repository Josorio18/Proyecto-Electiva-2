import React, { useState, useEffect } from 'react';

const Community = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=6')
      .then(res => res.json())
      .then(data => {
        setMembers(data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center" style={{ padding: '5rem' }}>
      <div className="loading-spinner"></div>
      <p>Cargando nuestra comunidad...</p>
    </div>
  );

  return (
    <div className="community-view">
      <div className="text-center mb-2">
        <h2>Nuestra Comunidad</h2>
        <p>Conoce a los miembros más activos de UrbanStyle. ¡Tú también puedes ser parte!</p>
      </div>
      
      <div className="product-grid">
        {members.map((member, index) => (
          <div key={index} className="product-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <img 
              src={member.picture.large} 
              alt={member.name.first} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1rem', border: '3px solid var(--accent-color)' }}
            />
            <h3 style={{ margin: '0.5rem 0' }}>{member.name.first} {member.name.last}</h3>
            <p style={{ fontStyle: 'italic', opacity: 0.8 }}>"{member.location.city}, {member.location.country}"</p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
              Miembro desde: {new Date(member.registered.date).getFullYear()}
            </p>
            <div style={{ marginTop: '1rem', color: 'var(--accent-color)' }}>
              {"★".repeat(Math.floor(Math.random() * 2) + 4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;

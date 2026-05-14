import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-view">
      <div className="hero-container">
        <img 
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Urban Streetwear" 
          className="hero-img" 
        />
        <div className="hero-overlay">
          <h2>REDEFINE TU ESTILO</h2>
          <p>Explora la colección exclusiva de UrbanStyle V2. Calidad, diseño y actitud en cada prenda.</p>
          <div className="mt-2">
            <Link to="/catalog" className="buy-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Ver Catálogo
            </Link>
          </div>
        </div>
      </div>

      <section className="featured-categories mt-2">
        <h3 className="text-center mb-2">Categorías Destacadas</h3>
        <div className="product-grid">
          <Link to="/catalog/men's clothing" className="category-card">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=500&q=60" alt="Hombres" />
              <div className="card-overlay">
                <h4>Hombres</h4>
              </div>
            </div>
          </Link>
          <Link to="/catalog/women's clothing" className="category-card">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=500&q=60" alt="Mujeres" />
              <div className="card-overlay">
                <h4>Mujeres</h4>
              </div>
            </div>
          </Link>
          <Link to="/catalog/accessories" className="category-card">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60" alt="Accesorios" />
              <div className="card-overlay">
                <h4>Accesorios</h4>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

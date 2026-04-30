import React from 'react';
import ProductCard from './ProductCard';
import pantalonPremiumImg from '../assets/images/pantalon_premium.webp';

const Home: React.FC = () => {
  return (
    <main>
      <section className="hero mb-2">
        <div className="hero-container">
          <img
            src="/images/ropa.jpg"
            alt="UrbanStyle Banner"
            className="hero-img"
          />
          <div className="hero-overlay">
            <h2>Nueva Colección 2026</h2>
            <p>Encuentra tu estilo único en UrbanStyle.</p>
          </div>
        </div>
      </section>

      <section className="products">
        <h2 className="text-center mb-2">Productos Destacados</h2>
        <div className="product-grid">
          <ProductCard
            image="https://img.ltwebstatic.com/images3_pi/2022/01/09/164173464374cc3298a2fb93e64549e59ae21404e6.jpg"
            name="Vestido Elegancia"
            price={49.99}
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"
            name="Chaqueta Urbana"
            price={79.99}
          />
          <ProductCard
            image={pantalonPremiumImg}
            name="Pantalón Premium"
            price={59.99}
            objectPosition="center 15%"
          />
        </div>
      </section>

      <a href="/carrito" className="btn-ver-carrito">🛒</a>
    </main>
  );
};

export default Home;
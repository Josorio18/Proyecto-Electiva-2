import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Catalog = ({ onAddToCart }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        if (category) {
            if (category === 'accessories') {
                setProducts(data.filter(p => p.category === 'jewelery' || p.category === 'electronics'));
            } else {
                setProducts(data.filter(p => p.category === category));
            }
        } else {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  if (loading) return (
    <div className="text-center" style={{ padding: '5rem' }}>
      <div className="loading-spinner"></div>
      <p>Cargando productos exclusivos...</p>
    </div>
  );

  return (
    <div className="catalog-view">
      <h2 className="text-center mb-2" style={{ textTransform: 'capitalize' }}>
        {category ? (category === 'accessories' ? 'Accesorios' : category) : 'Colección Completa'}
      </h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={() => onAddToCart(product)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;

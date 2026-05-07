import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img 
                src={product.image} 
                alt={product.title} 
                style={{ height: '300px', objectFit: 'contain', padding: '1rem', background: 'white' }} 
            />
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <button className="buy-button">Añadir al Carrito</button>
        </div>
    );
};

export default ProductCard;

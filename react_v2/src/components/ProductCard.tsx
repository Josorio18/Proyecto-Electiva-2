import React from 'react';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  objectPosition?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, objectPosition = 'center' }) => {
  return (
    <article className="product-card">
      <img 
        src={image} 
        alt={name} 
        style={{ objectPosition: objectPosition }} 
      />
      <h3>{name}</h3>
      <p className="price">${price.toFixed(2)}</p>
      <div className="product-actions">
        <div className="action-row">
          <div className="action-item">
            <label>Talla:</label>
            <select className="size-select">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <div className="action-item">
            <label>Cant:</label>
            <input type="number" className="quantity-input" defaultValue="1" min="1" />
          </div>
        </div>
      </div>
      <button className="buy-button">Añadir al carrito</button>
    </article>
  );
};

export default ProductCard;

import React from 'react';
import { storageService } from '../services/storageService';

const Cart = ({ cart, onRemove, onClear }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío");
    alert("¡Gracias por tu compra! Tu pedido de UrbanStyle V2 está en camino.");
    onClear();
  };

  return (
    <div className="cart-view text-center">
      <h2>Mi Carrito</h2>
      {cart.length === 0 ? (
        <div style={{ padding: '3rem' }}>
          <p>Tu carrito está actualmente vacío.</p>
          <button className="buy-button" onClick={() => window.location.href='/catalog'}>Ir a Comprar</button>
        </div>
      ) : (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="product-grid">
            {cart.map((item, index) => (
              <div key={index} className="product-card" style={{ padding: '1rem', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.title}</h4>
                  <p className="price" style={{ margin: 0 }}>${item.price}</p>
                </div>
                <button 
                  className="buy-button" 
                  style={{ background: '#ff4757', margin: 0, padding: '0.5rem 1rem' }}
                  onClick={() => onRemove(index)}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: '2rem', padding: '2rem' }}>
            <h3>Resumen de Pedido</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                <span>Total:</span>
                <span style={{ color: 'var(--accent-color)' }}>${total.toFixed(2)}</span>
            </div>
            <button className="buy-button" onClick={handleCheckout} style={{ width: '100%', padding: '1.2rem' }}>
                Finalizar Compra Segura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

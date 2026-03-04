// Archivo de utilidad general para el sitio

console.log('app.js cargado');

// funciones compartidas para consultar carrito de usuario
function getCurrentUser() {
    return localStorage.getItem('user') || sessionStorage.getItem('user') || 'guest';
}
function cartKey() {
    return 'shoppingCart_' + getCurrentUser();
}
function getCart() {
    return JSON.parse(localStorage.getItem(cartKey()) || '[]');
}

// actualiza el contador en el botón flotante del carrito
function updateCartBadge() {
    const btn = document.querySelector('.btn-ver-carrito');
    if(!btn) return;
    const cart = getCart();
    const count = cart.length;
    if(count > 0) {
        btn.textContent = `🛒 (${count})`;
    } else {
        btn.textContent = '🛒';
    }
}

// ejecutar al cargar la página y cada vez que el carrito cambie
document.addEventListener('DOMContentLoaded', updateCartBadge);

// también sobreescribir addToCart globalmente para notificar al contador
const originalAdd = window.addToCart;
window.addToCart = function(item) {
    if (originalAdd) originalAdd(item);
    updateCartBadge();
};

// Aquí se pueden añadir funcionalidades comunes a varias páginas,
// como manejo de carrito, animaciones, cambios en el header, etc.


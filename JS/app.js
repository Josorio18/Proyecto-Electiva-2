// Archivo de utilidad general para el sitio

console.log('app.js cargado');

// funciones compartidas para consultar carrito de usuario
function getCurrentUser() {
    return localStorage.getItem('currentUser') || 'guest';
}

function getCurrentUserName() {
    return localStorage.getItem('currentUserName') || '';
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserName');
    window.location.href = 'Login.html';
}

function updateNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const user = getCurrentUser();

    // Find login/register links
    const loginLink = Array.from(nav.querySelectorAll('a')).find(a => a.getAttribute('href') === 'Login.html' || a.textContent.trim().toLowerCase() === 'login');
    const registerLink = Array.from(nav.querySelectorAll('a')).find(a => a.getAttribute('href') === 'Registro.html' || a.textContent.trim().toLowerCase() === 'registro');

    if (user !== 'guest') {
        const userName = getCurrentUserName();

        if (loginLink) {
            loginLink.textContent = `Hola, ${userName}`;
            loginLink.href = '#';
            loginLink.style.pointerEvents = 'none';
        }

        if (registerLink) {
            registerLink.textContent = 'Cerrar sesión';
            registerLink.href = '#';
            registerLink.style.pointerEvents = 'auto';
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        } else if (loginLink) {
            // If there's no register link (some pages), we dynamically add the logout link
            const logoutLink = document.createElement('a');
            logoutLink.textContent = 'Cerrar sesión';
            logoutLink.href = '#';
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
            nav.appendChild(logoutLink);
        }
    }
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
    if (!btn) return;
    const cart = getCart();
    const count = cart.length;
    if (count > 0) {
        btn.textContent = `🛒 (${count})`;
    } else {
        btn.textContent = '🛒';
    }
}

// ejecutar al cargar la página y cada vez que el carrito cambie
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    updateNavigation();
});

// también sobreescribir addToCart globalmente para notificar al contador
const originalAdd = window.addToCart;
window.addToCart = function (item) {
    if (originalAdd) originalAdd(item);
    updateCartBadge();
};

// Aquí se pueden añadir funcionalidades comunes a varias páginas,
// como manejo de carrito, animaciones, cambios en el header, etc.


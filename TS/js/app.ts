// Archivo de utilidad general para el sitio

declare global {
    interface Window {
        addToCart: (item: { title: string; price: string; size?: string; quantity?: number }) => void;
    }
}

console.log('app.js cargado');

// funciones compartidas para consultar carrito de usuario
function getCurrentUser() {
    return localStorage.getItem('currentUser') || 'guest';
}

function getCurrentUserName() {
    return localStorage.getItem('currentUserName') || '';
}

function logout(): void {
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
        const userName = getCurrentUserName() || user.split('@')[0];

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
function cartKey(): string {
    return 'shoppingCart_' + getCurrentUser();
}
function getCart() {
    return JSON.parse(localStorage.getItem(cartKey()) || '[]');
}

// actualiza el contador en el botón flotante del carrito
function updateCartBadge(): void {
    const btn = document.querySelector('.btn-ver-carrito') as HTMLElement | null;
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

    // Funcionalidad dinámica para la página de inicio
    const gallery = document.querySelector('.image-gallery');
    if (gallery) {
        gallery.innerHTML = `
            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
                <div class="product-card card" style="text-align: center; border: 1px solid #ccc; padding: 15px; border-radius: 8px; width: 250px; background-color: white;">
                    <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQR98yhYHDIJauIVcrsjpOLQyuNi6zR72mhU9jqYLPFHg9zTk8V-pzQF4XVs5gQkza2MtSvxWw8R5ufsZZab_kKqMxsSA125A" alt="Camiseta Especial" style="max-width: 100%; max-height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;">
                    <h3 style="margin: 10px 0;">Camiseta Especial</h3>
                    <p class="price" style="font-weight: bold; color: var(--primary-color); font-size: 1.2em; margin-bottom: 15px;">$45.00</p>
                    <label for="featQty1" style="display: inline-block; margin-bottom: 5px;">Cantidad:</label>
                    <input type="number" id="featQty1" class="quantity-input" min="1" value="1" style="width: 50px; margin-bottom: 15px; padding: 5px; text-align: center;">
                    <br>
                    <button style="background-color: var(--primary-color); color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 5px; font-weight: bold; width: 100%; transition: background-color 0.3s;">Añadir al carrito</button>
                </div>
                <div class="product-card card" style="text-align: center; border: 1px solid #ccc; padding: 15px; border-radius: 8px; width: 250px; background-color: white;">
                    <img src="../images/gafas urbanas.jpg" alt="Gafas Exclusivas" style="max-width: 100%; max-height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;">
                    <h3 style="margin: 10px 0;">Gafas Exclusivas</h3>
                    <p class="price" style="font-weight: bold; color: var(--primary-color); font-size: 1.2em; margin-bottom: 15px;">$25.00</p>
                    <label for="featQty2" style="display: inline-block; margin-bottom: 5px;">Cantidad:</label>
                    <input type="number" id="featQty2" class="quantity-input" min="1" value="1" style="width: 50px; margin-bottom: 15px; padding: 5px; text-align: center;">
                    <br>
                    <button style="background-color: var(--primary-color); color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 5px; font-weight: bold; width: 100%; transition: background-color 0.3s;">Añadir al carrito</button>
                </div>
            </div>
        `;
    }
});

// también sobreescribir addToCart globalmente para notificar al contador
const originalAdd = (window as any).addToCart;
(window as any).addToCart = function (item: any): void {
    if (originalAdd) originalAdd(item);
    updateCartBadge();
};

// Aquí se pueden añadir funcionalidades comunes a varias páginas,
// como manejo de carrito, animaciones, cambios en el header, etc.


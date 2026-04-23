import { getCurrentUser, getCurrentUserName, logout, updateCartBadge } from './Common.js';
// Registro global de funciones para acceso desde el HTML (si es necesario)
window.updateCartBadge = updateCartBadge;
window.logout = logout;
console.log('UrbanStyle Logic Loaded');
/**
 * Actualiza la barra de navegación basándose en el estado de autenticación del usuario.
 * Muestra el nombre del usuario y el botón de cerrar sesión si el usuario está identificado.
 */
function updateNavigation() {
    const nav = document.querySelector('nav');
    if (!nav)
        return;
    const userEmail = getCurrentUser();
    // Buscar el enlace de login existente
    const allLinks = Array.from(nav.querySelectorAll('a'));
    const loginLink = allLinks.find(a => { var _a, _b; return ((_a = a.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.includes('Login.html')) || ((_b = a.textContent) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase()) === 'login'; });
    if (userEmail !== 'guest' && userEmail) {
        const userName = getCurrentUserName() || userEmail.split('@')[0];
        if (loginLink) {
            const loginAnchor = loginLink;
            loginAnchor.innerHTML = `<span class="user-welcome">👤 ${userName}</span>`;
            loginAnchor.href = '#';
            loginAnchor.style.cursor = 'default';
            loginAnchor.classList.add('logged-in-user');
            // Crear botón de Cerrar Sesión si no existe
            let logoutBtn = nav.querySelector('.logout-link');
            if (!logoutBtn) {
                logoutBtn = document.createElement('a');
                logoutBtn.href = '#';
                logoutBtn.textContent = 'Salir';
                logoutBtn.className = 'logout-link';
                logoutBtn.style.color = '#ff4444';
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    logout();
                });
                loginAnchor.after(logoutBtn);
            }
        }
        // Ocultar registro
        const registerLink = allLinks.find(a => { var _a, _b; return ((_a = a.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.includes('Registro.html')) || ((_b = a.textContent) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase()) === 'registro'; });
        if (registerLink)
            registerLink.style.display = 'none';
    }
}
/**
 * Inicialización principal al cargar el DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Actualizamos el estado visual del carrito y la navegación
    updateCartBadge();
    updateNavigation();
    // Lógica específica para la "Galería" en la página principal (Home)
    const galleryContainer = document.querySelector('.image-gallery');
    if (galleryContainer) {
        console.log('Inicializando galería dinámica...');
        // Aquí se pueden cargar productos destacados de forma dinámica en el futuro
    }
});

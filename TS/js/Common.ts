/**
 * Common.ts
 * 
 * Este archivo contiene las funciones de utilidad compartidas para todo el proyecto UrbanStyle.
 * Proporciona una interfaz única para la gestión del carrito y la sesión del usuario,
 * evitando la duplicación de código y asegurando la integridad de los datos.
 */

/**
 * Obtiene el identificador del usuario actual.
 * @returns {string} El correo electrónico del usuario o 'guest' si no hay sesión iniciada.
 */
export function getCurrentUser(): string {
    return localStorage.getItem('currentUser') || 'guest';
}

/**
 * Obtiene el nombre del usuario actual.
 * @returns {string} El nombre guardado en localStorage o una cadena vacía.
 */
export function getCurrentUserName(): string {
    return localStorage.getItem('currentUserName') || '';
}

/**
 * Cierra la sesión del usuario limpiando los datos de localStorage.
 */
export function logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserName');
    window.location.href = 'Login.html';
}

/**
 * Genera la clave única para el carrito de compras en localStorage.
 * Cada usuario tiene su propio carrito persistente.
 * @returns {string} La clave en formato 'shoppingCart_[user]'.
 */
export function cartKey(): string {
    return 'shoppingCart_' + getCurrentUser();
}

/**
 * Recupera el contenido del carrito desde localStorage.
 * @returns {any[]} Array de objetos que representan los productos en el carrito.
 */
export function getCart(): any[] {
    try {
        const data = localStorage.getItem(cartKey());
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error al parsear el carrito:', e);
        return [];
    }
}

/**
 * Guarda el estado actual del carrito en localStorage.
 * @param {any[]} cart - Array de productos a guardar.
 */
export function saveCart(cart: any[]): void {
    try {
        localStorage.setItem(cartKey(), JSON.stringify(cart));
    } catch (e) {
        console.error('Error al guardar el carrito:', e);
        alert('No se pudo guardar el carrito. Es posible que el almacenamiento esté lleno.');
    }
}

/**
 * Actualiza el indicador visual del carrito (badge) en todas las páginas.
 * Busca un elemento con la clase '.btn-ver-carrito'.
 */
export function updateCartBadge(): void {
    const btn = document.querySelector('.btn-ver-carrito') as HTMLElement | null;
    if (!btn) return;
    
    const cart = getCart();
    // Sumamos las cantidades de todos los items
    const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    
    if (count > 0) {
        btn.innerHTML = `🛒 <span class="badge" style="background: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 0.7em; position: absolute; top: -5px; right: -5px;">${count}</span>`;
        btn.style.position = 'relative'; // Asegurar que el badge se posicione bien
    } else {
        btn.textContent = '🛒';
    }
}

/**
 * Transfiere los productos del carrito de invitado al carrito del usuario recién logueado.
 * @param {string} userEmail - El correo del usuario que inicia sesión.
 */
export function transferGuestCart(userEmail: string): void {
    const guestCartKey = 'shoppingCart_guest';
    const guestData = localStorage.getItem(guestCartKey);
    const guestCart = guestData ? JSON.parse(guestData) : [];
    
    if (guestCart.length > 0) {
        const userCartKey = 'shoppingCart_' + userEmail;
        const userData = localStorage.getItem(userCartKey);
        let userCart = userData ? JSON.parse(userData) : [];
        
        // Combinar carritos
        userCart = userCart.concat(guestCart);
        
        localStorage.setItem(userCartKey, JSON.stringify(userCart));
        localStorage.removeItem(guestCartKey);
        console.log('Carrito de invitado transferido al usuario:', userEmail);
    }
}
/**
 * Muestra una notificación temporal (toast) en la pantalla de forma elegante.
 */
export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Limitar a máximo 3 toasts visibles para evitar saturación
    if (container.children.length >= 3) {
        const first = container.firstChild as HTMLElement;
        if (first) first.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✅ ' : type === 'error' ? '❌ ' : 'ℹ️ ';
    toast.textContent = icon + message;
    
    container.appendChild(toast);
    
    // Animación de entrada y salida suave
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.style.transition = 'all 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}

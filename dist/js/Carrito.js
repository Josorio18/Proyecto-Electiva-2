import { getCurrentUser, getCurrentUserName, cartKey, getCart, saveCart, updateCartBadge, showToast } from './Common.js';
/**
 * Añade un producto al carrito persistente del usuario actual.
 * @param {any} item - El objeto del producto a añadir.
 */
export function addToCart(item) {
    const cart = getCart();
    // Verificar si el producto ya existe para incrementar cantidad
    const existingItem = cart.find((it) => it.title === item.title && it.size === item.size);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
    }
    else {
        cart.push(item);
    }
    saveCart(cart);
    showToast(`¡${item.title} añadido al carrito!`);
    updateCartBadge();
    // Si estamos en la página del carrito, re-renderizar
    if (document.getElementById('cartItems')) {
        renderCart();
    }
}
// Hacer disponible globalmente para facilitar la integración con el HTML
window.addToCart = addToCart;
/**
 * Renderiza los elementos del carrito en el DOM.
 * Calcula el subtotal y el total de la compra.
 */
function renderCart() {
    var _a, _b;
    const cart = getCart();
    const container = document.getElementById('cartItems');
    const summaryEl = document.getElementById('cartSummary');
    if (!container)
        return;
    container.innerHTML = '';
    if (summaryEl)
        summaryEl.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-container" style="text-align: center; padding: 3rem;">
                <p class="empty-cart-msg" style="font-size: 1.2rem; color: #888;">Tu carrito está vacío. ¡Empieza a comprar!</p>
                <a href="Hombre.html" class="btn-primary" style="display: inline-block; margin-top: 1rem; padding: 0.8rem 2rem; background: var(--primary-color); color: white; border-radius: 8px; text-decoration: none;">Ver Catálogo</a>
            </div>
        `;
        return;
    }
    let total = 0;
    cart.forEach((it, index) => {
        const qty = it.quantity || 1;
        const itemPrice = parseFloat(String(it.price).replace(/[^0-9\.]+/g, '')) || 0;
        const subtotalItem = itemPrice * qty;
        total += subtotalItem;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-info">
                <span class="item-name">${it.title}</span>
                <span class="item-details">${it.size ? `Talla: ${it.size}` : ''}</span>
            </div>
            <div class="item-controls">
                <button class="qty-btn minus" data-index="${index}">−</button>
                <span class="qty-display">${qty}</span>
                <button class="qty-btn plus" data-index="${index}">+</button>
            </div>
            <div class="item-price-block">
                <span class="item-price">$${subtotalItem.toFixed(2)}</span>
                <button class="btn-remove" data-index="${index}">ELIMINAR</button>
            </div>
        `;
        container.appendChild(div);
    });
    // Eventos para botones de cantidad
    container.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.target;
            const idx = parseInt(btnEl.getAttribute('data-index') || '0', 10);
            const isPlus = btnEl.classList.contains('plus');
            updateQuantity(idx, isPlus ? 1 : -1);
        });
    });
    // Eventos para eliminar ítems
    container.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index') || '0', 10);
            removeFromCart(idx);
        });
    });
    if (summaryEl) {
        summaryEl.innerHTML = `
            <div class="cart-total" style="display: flex; justify-content: flex-end; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
                <span style="font-size: 1.2rem;">Total a pagar:</span>
                <span class="total-amount" style="font-size: 1.8rem; font-weight: 800; color: var(--accent-color);">$${total.toFixed(2)}</span>
            </div>
            <div class="cart-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                <button class="btn-clear-cart" style="background: none; border: 1px solid #ccc; padding: 0.8rem 1.5rem; border-radius: 30px; cursor: pointer; transition: all 0.3s;">Vaciar Carrito</button>
                <button class="btn-checkout btn-primary" style="border: none; cursor: pointer;">Proceder al Pago</button>
            </div>
        `;
        (_a = summaryEl.querySelector('.btn-checkout')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => openPaymentModal(total));
        (_b = summaryEl.querySelector('.btn-clear-cart')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
                saveCart([]);
                renderCart();
                updateCartBadge();
                showToast('Carrito vaciado', 'info');
            }
        });
    }
}
/**
 * Actualiza la cantidad de un ítem en el carrito.
 * @param {number} index - Índice del ítem.
 * @param {number} delta - Cambio en la cantidad (+1 o -1).
 */
function updateQuantity(index, delta) {
    const cart = getCart();
    if (cart[index]) {
        cart[index].quantity = (cart[index].quantity || 1) + delta;
        if (cart[index].quantity < 1) {
            removeFromCart(index);
        }
        else {
            saveCart(cart);
            renderCart();
            updateCartBadge();
        }
    }
}
/**
 * Elimina un producto del carrito por su índice.
 * @param {number} index - Posición del producto en el array.
 */
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    updateCartBadge();
}
/**
 * Muestra el nombre del usuario o invita a registrarse.
 */
function showStatusHeader() {
    const user = getCurrentUser();
    const userName = getCurrentUserName();
    const el = document.getElementById('userName');
    const promo = document.getElementById('guestPromo');
    if (user === 'guest') {
        if (el)
            el.textContent = 'Invitado';
        if (promo)
            promo.style.display = 'block';
    }
    else {
        if (el)
            el.textContent = (userName || user.split('@')[0]);
        if (promo)
            promo.style.display = 'none';
    }
}
/**
 * Escucha clics globales para el botón "Añadir al carrito" en cualquier página.
 */
document.addEventListener('click', (e) => {
    var _a, _b, _c, _d;
    const target = e.target;
    const buyButton = target.closest('.buy-button');
    if (buyButton) {
        e.preventDefault();
        const card = buyButton.closest('.product-card') || buyButton.closest('.card');
        if (!card)
            return;
        const title = ((_b = (_a = card.querySelector('h2, h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || 'Producto';
        const price = ((_d = (_c = card.querySelector('.price')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '$0';
        const sizeSelect = card.querySelector('.size-select');
        const size = sizeSelect ? sizeSelect.value : 'M';
        const quantityInput = card.querySelector('.quantity-input');
        const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;
        if (isNaN(quantity) || quantity <= 0) {
            showToast('Por favor, ingresa una cantidad válida.', 'error');
            return;
        }
        addToCart({ title, price, size, quantity });
    }
});
/**
 * Lógica del Modal de Pago
 */
function openPaymentModal(total) {
    const modal = document.getElementById('paymentModal');
    const modalSubtotal = document.getElementById('modalSubtotal');
    const modalTotal = document.getElementById('modalTotal');
    if (modal && modalSubtotal && modalTotal) {
        modalSubtotal.textContent = '$' + total.toFixed(2);
        modalTotal.textContent = '$' + total.toFixed(2);
        modal.style.display = 'flex';
        // Centrar scroll al mostrar modal
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
/**
 * Inicialización al cargar el carrito.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartItems')) {
        showStatusHeader();
        renderCart();
        const modal = document.getElementById('paymentModal');
        if (modal) {
            const closeModalBtn = modal.querySelector('.close-modal');
            const paymentForm = document.getElementById('paymentForm');
            const radios = document.querySelectorAll('input[name="paymentMethod"]');
            const cardBlock = document.getElementById('cardDetailsBlock');
            closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
            radios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    if (cardBlock) {
                        cardBlock.style.display = e.target.value === 'card' ? 'block' : 'none';
                    }
                });
            });
            paymentForm === null || paymentForm === void 0 ? void 0 : paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                processPayment(modal);
            });
        }
    }
});
/**
 * Simula el procesamiento del pago.
 */
function processPayment(modal) {
    var _a;
    const checkedRadio = document.querySelector('input[name="paymentMethod"]:checked');
    if (!checkedRadio)
        return;
    if (checkedRadio.value === 'card') {
        const cardNumber = ((_a = document.getElementById('cardNumber')) === null || _a === void 0 ? void 0 : _a.value) || '';
        if (cardNumber.length < 15) {
            showToast('Por favor ingrese un número de tarjeta válido.', 'error');
            return;
        }
    }
    modal.style.display = 'none';
    // Efecto visual de éxito premium
    const successMsg = document.createElement('div');
    successMsg.className = 'payment-success-overlay';
    successMsg.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(255, 255, 255, 0.95); display: flex; flex-direction: column;
        justify-content: center; align-items: center; z-index: 10000;
        animation: fadeIn 0.5s ease-out;
    `;
    successMsg.innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 20px; animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">✅</div>
        <h2 style="color: var(--primary-color); font-size: 2.5rem; margin-bottom: 10px;">¡Pago Exitoso!</h2>
        <p style="font-size: 1.2rem; color: #555;">Tu pedido está en camino. Gracias por elegir <strong>UrbanStyle</strong>.</p>
        <div style="margin-top: 30px; border-bottom: 2px solid var(--accent-color); width: 50px;"></div>
    `;
    document.body.appendChild(successMsg);
    saveCart([]); // Limpiar carrito
    renderCart();
    updateCartBadge();
    setTimeout(() => {
        successMsg.style.opacity = '0';
        successMsg.style.transition = 'opacity 1s';
        setTimeout(() => {
            successMsg.remove();
            window.location.href = 'index.html';
        }, 1000);
    }, 3000);
}

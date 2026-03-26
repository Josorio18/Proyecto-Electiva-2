declare global {
    interface Window {
        addToCart: (item: { title: string; price: string; size?: string; quantity?: number }) => void;
        updateCartBadge: () => void;
    }
}

(function(){
    // cart key per current user
    function getCurrentUser() {
        return localStorage.getItem('currentUser') || 'guest';
    }

    function cartKey() {
        return 'shoppingCart_' + getCurrentUser();
    }

    function getCart() {
        return JSON.parse(localStorage.getItem(cartKey()) || '[]');
    }

    function saveCart(cart: any[]) {
        localStorage.setItem(cartKey(), JSON.stringify(cart));
    }

    // hace disponible la función globalmente
    window.addToCart = function(item){
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        alert('Producto agregado al carrito');
        if(typeof window.updateCartBadge === 'function') window.updateCartBadge();
    };

    function renderCart() {
        const cart = getCart();
        const container = document.getElementById('cartItems');
        const summaryEl = document.getElementById('cartSummary');
        if(!container) return;
        container.innerHTML = '';
        if(summaryEl) summaryEl.innerHTML = '';

        if(cart.length === 0) {
            container.textContent = 'No hay productos en el carrito.';
            return;
        }

        let total = 0;
        cart.forEach((it: any, idx: number) => {
            const qty = it.quantity || 1;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span class="item-name">${it.title} (x${qty})</span>
                <span class="item-price">${it.price}</span>
                ${it.size ? `<span class="item-size">Talla: ${it.size}</span>` : ''}
            `;
            container.appendChild(div);

            const num = parseFloat(it.price.replace(/[^0-9\.]+/g, ''));
            if(!isNaN(num)) total += num * qty;
        });

        if(summaryEl) {
            summaryEl.innerHTML = `<div>Total: $${total.toFixed(2)}</div>`;
            const btn = document.createElement('button');
            btn.textContent = 'Proceder al Pago';
            btn.className = 'btn-checkout';
            btn.addEventListener('click', function(){
                openPaymentModal(total);
            });
            summaryEl.appendChild(btn);
        }
    }

    function showUserName() {
        const user = getCurrentUser();
        const userName = localStorage.getItem('currentUserName');
        const el = document.getElementById('userName');
        const promo = document.getElementById('guestPromo');

        if (user === 'guest') {
            if(el) el.textContent = 'Invitado';
            if(promo) promo.style.display = 'block';
        } else {
            if(el) el.textContent = (userName || user.split('@')[0]) as string;
            if(promo) promo.style.display = 'none';
        }
    }

    // listener genérico para agregar al carrito desde cualquier página
    window.addToCart = function(item){
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        alert('Producto agregado al carrito');
        if(typeof window.updateCartBadge === 'function') window.updateCartBadge();
    };

    document.addEventListener('click', function(e){
        const btn = e.target as HTMLElement;
        if(btn && btn.tagName === 'BUTTON'){
            const card = btn.closest('.product-card') || btn.closest('.card');
            if(card) {
                const titleEl = card.querySelector('h2, h3');
                const priceEl = card.querySelector('.price');
                const sizeEl = card.querySelector('.size-select');
                const quantityEl = card.querySelector('.quantity-input');
                const title = titleEl ? titleEl.textContent!.trim() : '';
                const price = priceEl ? priceEl.textContent!.trim() : '';
                const size = sizeEl ? (sizeEl as HTMLInputElement).value : '';
                const quantity = quantityEl ? parseInt((quantityEl as HTMLInputElement).value, 10) || 1 : 1;
                window.addToCart({ title, price, size, quantity });
            }
        }
    });

    function clearCart(){
        saveCart([]);
    }

    // Lógica del Modal de Pago
    function openPaymentModal(total: number) {
        const modal = document.getElementById('paymentModal');
        const modalSubtotal = document.getElementById('modalSubtotal');
        const modalTotal = document.getElementById('modalTotal');
        
        if (modal) {
            modalSubtotal!.textContent = '$' + total.toFixed(2);
            modalTotal!.textContent = '$' + total.toFixed(2);
            modal.style.display = 'flex';
        }
    }

    document.addEventListener('DOMContentLoaded', function(){
        if(document.getElementById('cartItems')){
            showUserName();
            renderCart();

            // Configurar eventos del modal de pago si existe
            const modal = document.getElementById('paymentModal');
            if (modal) {
                const closeModalBtn = modal.querySelector('.close-modal');
                const paymentForm = document.getElementById('paymentForm');
                const radios = document.querySelectorAll('input[name="paymentMethod"]');
                const cardBlock = document.getElementById('cardDetailsBlock');

                // Cerrar modal
                closeModalBtn!.addEventListener('click', () => {
                    modal.style.display = 'none';
                });

                // Cambiar métodos de pago
                radios.forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        if ((e.target as HTMLInputElement).value === 'card') {
                            cardBlock!.style.display = 'block';
                        } else {
                            cardBlock!.style.display = 'none';
                        }
                    });
                });

                // Procesar pago simulado
                paymentForm!.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const method = (document.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement).value;
                    if (method === 'card') {
                        const cn = (document.getElementById('cardNumber') as HTMLInputElement).value;
                        if(cn.length < 15) {
                            alert('Por favor ingrese una tarjeta válida para simular el pago.');
                            return;
                        }
                    }

                    modal.style.display = 'none';
                    alert('¡Pago Procesado Exitosamente!\nGracias por tu compra en UrbanStyle.');
                    clearCart();
                    renderCart();
                    window.location.href = 'index.html'; // Devolver al inicio al terminar
                });
            }
        }
    });
})();

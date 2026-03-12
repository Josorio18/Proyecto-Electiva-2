(function(){
    // cart key per current user
    function getCurrentUser() {
        return localStorage.getItem('user') || sessionStorage.getItem('user') || 'guest';
    }

    function cartKey() {
        return 'shoppingCart_' + getCurrentUser();
    }

    function getCart() {
        return JSON.parse(localStorage.getItem(cartKey()) || '[]');
    }

    function saveCart(cart) {
        localStorage.setItem(cartKey(), JSON.stringify(cart));
    }

    // hace disponible la función globalmente
    window.addToCart = function(item){
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        alert('Producto agregado al carrito');
        if(typeof updateCartBadge === 'function') updateCartBadge();
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
        cart.forEach((it, idx) => {
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
            btn.textContent = 'Finalizar compra';
            btn.addEventListener('click', function(){
                if(confirm('¿Deseas confirmar la compra por $' + total.toFixed(2) + '?')){
                    clearCart();
                    renderCart();
                    alert('¡Gracias por tu compra!');
                }
            });
            summaryEl.appendChild(btn);
        }
    }

    function showUserName() {
        const user = getCurrentUser();
        const el = document.getElementById('userName');
        if(el) el.textContent = user === 'guest' ? 'Invitado' : user;
    }

    // listener genérico para agregar al carrito desde cualquier página
    window.addToCart = function(item){
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        alert('Producto agregado al carrito');
        if(typeof updateCartBadge === 'function') updateCartBadge();
    };

    document.addEventListener('click', function(e){
        const btn = e.target;
        if(btn.tagName === 'BUTTON'){
            const card = btn.closest('.product-card') || btn.closest('.card');
            if(card) {
                const titleEl = card.querySelector('h2, h3');
                const priceEl = card.querySelector('.price');
                const sizeEl = card.querySelector('.size-select');
                const quantityEl = card.querySelector('.quantity-input');
                const title = titleEl ? titleEl.textContent.trim() : '';
                const price = priceEl ? priceEl.textContent.trim() : '';
                const size = sizeEl ? sizeEl.value : '';
                const quantity = quantityEl ? parseInt(quantityEl.value, 10) || 1 : 1;
                addToCart({ title, price, size, quantity });
            }
        }
    });

    function clearCart(){
        saveCart([]);
    }

    document.addEventListener('DOMContentLoaded', function(){
        if(document.getElementById('cartItems')){
            showUserName();
            renderCart();
        }
    });
})();

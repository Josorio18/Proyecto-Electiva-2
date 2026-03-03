(function(){
    const CART_KEY = 'shoppingCart';

    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    // hace disponible la función globalmente
    window.addToCart = function(item){
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        alert('Producto agregado al carrito');
    };

    function renderCart() {
        const cart = getCart();
        const container = document.getElementById('cartItems');
        if(!container) return;
        container.innerHTML = '';

        if(cart.length === 0) {
            container.textContent = 'No hay productos en el carrito.';
            return;
        }
        

        cart.forEach((it, idx) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span class="item-name">${it.title}</span>
                <span class="item-price">${it.price}</span>
                ${it.size ? `<span class="item-size">Talla: ${it.size}</span>` : ''}
            `;
            container.appendChild(div);
        });
    }

    function showUserName() {
        const user = localStorage.getItem('user') || sessionStorage.getItem('user') || 'Invitado';
        const el = document.getElementById('userName');
        if(el) el.textContent = user;
    }

    // listener genérico para agregar al carrito desde cualquier página
    document.addEventListener('click', function(e){
        const btn = e.target;
        if(btn.tagName === 'BUTTON'){
            const card = btn.closest('.product-card') || btn.closest('.card');
            if(card) {
                const titleEl = card.querySelector('h2, h3');
                const priceEl = card.querySelector('.price');
                const sizeEl = card.querySelector('.size-select');
                const title = titleEl ? titleEl.textContent.trim() : '';
                const price = priceEl ? priceEl.textContent.trim() : '';
                const size = sizeEl ? sizeEl.value : '';
                addToCart({ title, price, size });
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function(){
        if(document.getElementById('cartItems')){
            showUserName();
            renderCart();
        }
    });
})();

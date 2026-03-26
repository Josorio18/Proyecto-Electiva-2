// Maneja el evento de compra para cada producto
window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buy-button');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            if (productCard) {
                const title = productCard.querySelector('h2').textContent;
                const price = productCard.querySelector('.price').textContent;
                const select = productCard.querySelector('.size-select');
                const size = select ? select.value : '';
                const quantityEl = productCard.querySelector('.quantity-input');
                const quantity = quantityEl ? parseInt(quantityEl.value, 10) || 1 : 1;
                if (typeof window.addToCart === 'function') {
                    window.addToCart({ title, price, size, quantity });
                }
            }
        });
    });
});
export {};

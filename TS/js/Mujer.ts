// Maneja el evento de compra para cada producto

window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buy-button');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            if (productCard) {
                const titleEl = productCard.querySelector('h2');
                const priceEl = productCard.querySelector('.price');
                const select = productCard.querySelector('.size-select') as HTMLInputElement;
                const quantityEl = productCard.querySelector('.quantity-input');
                const title = titleEl?.textContent || 'Producto desconocido';
                const price = priceEl?.textContent || 'Precio no disponible';
                const size = select?.value || 'Sin talla';
                const quantity = quantityEl ? parseInt((quantityEl as HTMLInputElement).value, 10) || 1 : 1;
                if (typeof window.addToCart === 'function') {
                    window.addToCart({ title, price, size, quantity });
                }
            }
        });
    });
    
});

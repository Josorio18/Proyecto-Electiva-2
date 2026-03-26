// Maneja el evento de compra para cada producto
window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.buy-button');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
 Feature-arreglos
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


            const productCard = btn.closest('.product-card') as HTMLElement | null;
            if (!productCard) return;

            const titleElement = productCard.querySelector('h2') as HTMLElement | null;
            const priceElement = productCard.querySelector('.price') as HTMLElement | null;
            const selectElement = productCard.querySelector('.size-select') as HTMLSelectElement | null;

            if (!titleElement || !priceElement || !selectElement) return;

            const title = titleElement.textContent || '';
            const price = priceElement.textContent || '';
            const size = selectElement.value;

            alert(`Has seleccionado:\nProducto: ${title}\nPrecio: ${price}\nTalla: ${size}`);

            // Aquí se podría añadir lógica para agregar al carrito
        });
    });
});
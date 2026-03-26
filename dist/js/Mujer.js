// Maneja el evento de compra para cada producto
window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buy-button');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            if (!productCard)
                return;
            const titleElement = productCard.querySelector('h2');
            const priceElement = productCard.querySelector('.price');
            const selectElement = productCard.querySelector('.size-select');
            if (!titleElement || !priceElement || !selectElement)
                return;
            const title = titleElement.textContent || '';
            const price = priceElement.textContent || '';
            const size = selectElement.value;
            alert(`Has seleccionado:\nProducto: ${title}\nPrecio: ${price}\nTalla: ${size}`);
            // Aquí se añade la lógica para agregar al carrito
            if (typeof window.addToCart === 'function') {
                window.addToCart({
                    title: title,
                    price: price,
                    size: size,
                    quantity: 1
                });
            }
        });
    });
});
export {};

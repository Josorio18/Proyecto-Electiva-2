// Maneja el evento de compra para cada producto
window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buy-button');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const title = productCard.querySelector('h2').textContent;
            const price = productCard.querySelector('.price').textContent;
            const select = productCard.querySelector('.size-select');
            const size = select.value;
            alert(`Has seleccionado:\nProducto: ${title}\nPrecio: ${price}\nTalla: ${size}`);
            // Aquí se podría añadir lógica para agregar al carrito
        });
    });
});
export {};

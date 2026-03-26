// Maneja el evento de compra para cada producto
window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.buy-button');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {

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
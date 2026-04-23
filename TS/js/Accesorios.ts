/**
 * Accesorios.ts
 * 
 * Lógica dinámica para la sección de accesorios.
 */

interface Producto {
    nombre: string;
    precio: string;
    imagen: string;
    descripcion: string;
}

const productosAccesorios: Producto[] = [
    {
        nombre: "Cadenas de Plata",
        precio: "$24.99",
        imagen: "../images/cadena%20plata.jpg",
        descripcion: "Cadena urbana en acero inoxidable o plata, ideal para looks street."
    },
    {
        nombre: "Collar Minimalista",
        precio: "$19.99",
        imagen: "../images/collar%20minimalista.jpg",
        descripcion: "Collar minimalista con amuletos y acabados en dorado o plateado."
    },
    {
        nombre: "Gafas de Sol Urban",
        precio: "$34.99",
        imagen: "../images/gafas%20urbanas.jpg",
        descripcion: "Gafas urbanas con montura negra o transparente y lentes polarizadas."
    },
    {
        nombre: "Pulsera de Cuero",
        precio: "$14.99",
        imagen: "../images/pulseras%20cuero.jpg",
        descripcion: "Pulsera de cuero o cadena con dijes, perfecta para combinar."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById("productos-accesorios");

    if (contenedor) {
        productosAccesorios.forEach(producto => {
            const card = document.createElement("article");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p style="padding: 0 1.2rem; font-size: 0.9em; color: #666;">${producto.descripcion}</p>
                <p class="price">${producto.precio}</p>
                <div class="product-actions">
                    <div class="action-row">
                        <div class="action-item">
                            <label>Talla:</label>
                            <select class="size-select">
                                <option value="Única">Única</option>
                                <option value="Ajustable">Ajustable</option>
                            </select>
                        </div>
                        <div class="action-item">
                            <label>Cant:</label>
                            <input type="number" class="quantity-input" value="1" min="1">
                        </div>
                    </div>
                </div>
                <button class="buy-button">Añadir al carrito</button>
            `;

            contenedor.appendChild(card);
        });
        console.log('Productos de accesorios cargados dinámicamente.');
    }
});

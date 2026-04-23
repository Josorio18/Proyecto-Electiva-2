/**
 * Hombre.ts
 * 
 * Maneja la lógica específica de la sección de hombres, 
 * incluyendo el renderizado dinámico de productos.
 */

interface Producto {
    nombre: string;
    precio: string;
    imagen: string;
}

const productos: Producto[] = [
    {
        nombre: "Camiseta Urbana Premium",
        precio: "$59.90",
        imagen: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQR98yhYHDIJauIVcrsjpOLQyuNi6zR72mhU9jqYLPFHg9zTk8V-pzQF4XVs5gQkza2MtSvxWw8R5ufsZZab_kKqMxsSA125A"
    },
    {
        nombre: "Chaqueta Street Noir",
        precio: "$149.90",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPkRf_4qkEtUcloGT4ku2NKH3g3R49Zqezg&s"
    },
    {
        nombre: "Pantalón Cargo Urbano",
        precio: "$89.90",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSplZ28NDXmNErsgnn_H9qAQ-41jJ4X4bQotw&s"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById("productos-hombres");

    if (contenedor) {
        productos.forEach(producto => {
            const card = document.createElement("article");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="price">${producto.precio}</p>
                <div class="product-actions">
                    <div class="action-row">
                        <div class="action-item">
                            <label>Talla:</label>
                            <select class="size-select">
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
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
        console.log('Productos de hombres cargados dinámicamente.');
    }
});

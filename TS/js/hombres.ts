const productos = [
    {
        nombre: "Camiseta Urbana",
        precio: "$59.900",
        imagen: "img/hombres/producto1.jpg"
    },
    {
        nombre: "Chaqueta Street",
        precio: "$149.900",
        imagen: "img/hombres/producto2.jpg"
    },
    {
        nombre: "Pantalón Largo",
        precio: "$89.900",
        imagen: "img/hombres/producto3.jpg"
    }
];

const contenedor = document.getElementById("productos-hombres");

if (contenedor) {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto");

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
<<<<<<< HEAD
            <button class="add-to-cart-btn">Agregar al carrito</button>
        `;

        contenedor.appendChild(card);
        
        const btn = card.querySelector('.add-to-cart-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                (window as any).addToCart({
                    title: producto.nombre,
                    price: producto.precio,
                    quantity: 1
                });
            });
        }
=======
            <button>Agregar al carrito</button>
        `;

        contenedor.appendChild(card);
>>>>>>> 40ec483b8f0444b7dc966516ce7d0863691327d1
    });
}
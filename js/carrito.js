window.addEventListener("load", () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
});

const mostrarCarrito = () => {
    const carritoContenido = document.getElementById("carritoContenido");
    carritoContenido.innerHTML = ""; 

    carrito.forEach((producto) => {
        //GENERA EL HTML PARA MOSTRAR CADA PRODUCTO DEL CARRITO
        const contenido_carrito = document.createElement("div");
        contenido_carrito.className = "container mt-5 table-responsive";
        contenido_carrito.innerHTML = `
            <table class="table">
                <thead>
                    <tr class="text-white border-bottom-none">
                        <th scope="col"></th>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio</th>
                        <th scope="col text-center">Cantidad</th>
                        <th scope="col">Eliminar</th>
                        <th scope="col">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="align-middle">
                            <img src="${producto.imagen}" alt="Producto">
                        </td>
                        <td data-titulo="Producto" class="align-middle">${producto.nombre}</td>
                        <td data-titulo="Precio" class="align-middle">
                            ${TIPO_MONEDA}
                            ${producto.precio}
                        </td>
                        <td data-titulo="Cantidad">
                            <div class="d-flex">
                                <button class="btn btn-outline-secondary mt-auto mb-auto" id="botonRestar">-</button>
                                <p class="ms-3 me-3 m-auto">${producto.cantidad}</p>
                                <button class="btn btn-outline-secondary mt-auto mb-auto" id="botonAgregar${producto.id}">+</button>
                            </div>
                        </td>
                        <td data-titulo="Eliminar">
                            <button onclick="eliminarCarrito(${producto.id})" class="btn rounded-pill mb-2 ps-4 align-middle">
                                <img class="imagen_carrito" src="../imagenes/boton_eliminar.png" alt="">
                            </button>
                        </td>
                        <td data-titulo="Subtotal" class="ps-4 align-middle">
                            ${producto.total}
                            <span class="d-none">0</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        //AGREGA EL CONTENIDO DE PRODUCTO UTILIZANDO LOS DATOS DE LOS PRODUCTOS DEL CARRITO
        carritoContenido.appendChild(contenido_carrito);
    });    
};

// LLAMA A LA FUNCION PARA MOSTRAR EL CARRITO CUANDO LA PAGINA SE CARGA
window.addEventListener("load", mostrarCarrito);


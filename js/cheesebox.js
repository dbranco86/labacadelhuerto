fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
        const productos = data;
        const arrayCheeseBox = productos.slice(-8);
        arrayCheeseBox.forEach((tabla, index) => {
            const cheeseboxContenido = document.querySelector(`#cheesebox_${index + 1}`);
            const contenido2 = document.createElement("div");
            contenido2.innerHTML = `
                <h5 class="tarjeta_titulo">${tabla.nombre}</h5>
                <p class="tarjeta_texto">Precio: ${TIPO_MONEDA} ${tabla.precio}</p>
            `;
            cheeseboxContenido.appendChild(contenido2);

            const boton_anadir = document.createElement("button");
            boton_anadir.innerText = "Añadir al carrito";
            boton_anadir.className = "card-button btn btn-secondary";
            boton_anadir.id = "anadirProducto" + tabla.id;
            cheeseboxContenido.appendChild(boton_anadir);

            boton_anadir.addEventListener("click", () => {
                const existe = carrito.some((producto) => producto.nombre === tabla.nombre);
                if (existe) {
                    const productos = carrito.map((producto) => {
                        if (producto.nombre === tabla.nombre) {
                            producto.cantidad++;
                            producto.total = producto.precio * producto.cantidad;
                            return producto;
                        } else {
                            return producto;
                        }
                    });
                    carrito = [...productos];
                } else {
                    carrito.push({
                        id: tabla.id,
                        nombre: tabla.nombre,
                        precio: tabla.precio,
                        cantidad: tabla.cantidad,
                        total: tabla.precio * tabla.cantidad,
                        imagen: tabla.imagen,
                    });
                }
                actualizarNumerito();
            });
            //CREANDO EVENTO PARA VER LAS ALERTAS DEL BOTON AÑADIR
            boton_anadir.addEventListener("click", () => {
                alertaAnadirAlCarrito(tabla);
            });
        });
    })
    .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
    });
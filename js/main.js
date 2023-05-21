
//CONSTRUCTOR DE OBJETOS
class Producto {
    constructor(id, nombre, precio, cantidad, imagen, total) {
        this.id = Number(id);
        this.nombre  = nombre;
        this.precio  = Number (precio);
        this.cantidad = Number (cantidad);
        this.imagen = imagen;
        this.total = total;
    }
}

//CREO OBJETOS
const PRODUCTO_1 = new Producto ("1", "Cheese Board n°1", "100", "1", "./imagenes/Quesos1-carrito.png", "200");
const PRODUCTO_2 = new Producto ("2", "Cheese Board n°2", "200", "1", "./imagenes/Quesos2-carrito.png", "200"); 
const PRODUCTO_3 = new Producto ("3", "Cheese Board n°3", "300", "1", "./imagenes/Quesos3-carrito.png", "300");
const PRODUCTO_4 = new Producto ("4", "Cheese Board n°4", "400", "1", "./imagenes/Quesos4-carrito.png", "400");

//CREO ARRAY DE PRODUCTOS
const productos = [
    PRODUCTO_1,
    PRODUCTO_2,
    PRODUCTO_3,
    PRODUCTO_4
];

//CREO ARRAY DE CARRITO
let carrito = [];

//ASIGNO TIPO DE MONEDA (SOLES PERUANOS)
const TIPO_MONEDA = "s/";

//CAPTURO ID DE TARJETAS
const verCarrito = document.getElementById ("verCarrito");
const contenidoCarrito = document.getElementById ("contenidoCarrito");

//CREANDO ELEMENTOS HTML
productos.forEach((tabla, index) => {
    //SELECCIONAMOS DE FORMA DINAMICA EL ELEMENTO DESDE EL HTML
    const cheeseboardContenido = document.querySelector(`#cheeseboard_${index + 1}`);
    const contenido = document.createElement("div");
    contenido.innerHTML = `
        <h5 class="tarjeta_titulo">${tabla.nombre}</h5>
        <p class="tarjeta_texto">Precio: ${TIPO_MONEDA} ${tabla.precio}</p>
    `;
    cheeseboardContenido.append(contenido);
    const boton_anadir = document.createElement("button");
    boton_anadir.innerText = "Añadir al carrito";
    boton_anadir.className = "card-button btn btn-secondary";
    boton_anadir.id = "anadirProducto" + tabla.id;
    cheeseboardContenido.append(boton_anadir);  
    
    //CREANDO EVENTO CLICK PARA AÑADIR CONTENIDO AL CARRITO
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
    });
    
    //CREANDO EVENTO PARA VER LAS ALERTAS DEL BOTON AÑADIR
    boton_anadir.addEventListener("click", () => {
        manejarAñadirAlCarrito(tabla);
    });
});

// CREANDO EVENTO PARA VER EL CARRITO
verCarrito.addEventListener("click", () =>{    
    generarContenidoCarrito();
    guardarEnStorage();
    ajustarTamanoCarrito();
    });

//FUNCION PARA GENERAR EL CONTENIDO DEL CARRITO
const generarContenidoCarrito =() =>{
contenidoCarrito.innerHTML = "";
    carrito.forEach((tabla) =>{
        let contenido_carrito = document.createElement ("div");
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
        <img src="${tabla.imagen}" alt="Producto">
        </td>
        <td data-titulo = "Producto" class="align-middle">${tabla.nombre}</td>
        <td data-titulo = "Precio" class="align-middle">
        ${TIPO_MONEDA}
        ${tabla.precio}
        </td>
        <td data-titulo = "Cantidad">
        <div class="d-flex">
        <button class="btn btn-outline-secondary mt-auto mb-auto" id="botonRestar">-</button>
        <p class="ms-3 me-3 m-auto">${tabla.cantidad}</p>
        <button class="btn btn-outline-secondary mt-auto mb-auto" id="botonAgregar${tabla.id}">+</button>
        </div>
        </td>
        <td data-titulo = "Eliminar">
        <button onclick= "eliminarCarrito (${tabla.id})" class="btn rounded-pill mb-2 ps-4 align-middle">
        <img class="imagen_carrito" src="./imagenes/boton_eliminar.png" alt="">
        </button>
        </td>
        <td data-titulo = "Subtotal" class="ps-4 align-middle">
        ${tabla.total}
        <span class="d-none">0</span>
        </td>
        </tr>
        </tbody>
        </table>
        `;
        contenidoCarrito.append(contenido_carrito);
    });
    
    //FUNCION PARA CALCULAR EL TOTAL DE LA COMPRA
    const totalCompra = carrito.reduce((a, b) => a +b.total, 0);
    const totalPagar = document.createElement ("div");
    totalPagar.className = ("container");
    totalPagar.innerHTML = `
    <hr class="w-25 ms-auto mt-5 hr-style">
    <hr class="w-25 ms-auto border-bottom border-5 bg-dark mt-4 hr-style">
    <div class="payment-checkout w-100">
    <div class="d-flex justify-content-end fw-bold">
    <p class="d-inline me-5">Total:</p>
    <span>
    ${TIPO_MONEDA}
    ${totalCompra}
    </span>
    </div>
    </div>
    <button class="card-button btn btn-secondary text-white fw-bold d-block ms-auto me-4">Pagar</button>
    <div class="mb-4">
    <a href="./index.html" class="text-decoration-none text-dark mt-5">
    <img class="flecha_atras_carrito" src="./imagenes/flecha-atras.png" alt="">
    <span class="fw-bold font">Continuar comprando</span>
    </a>
    </div>
    </div>
    `;
    contenidoCarrito.append(totalPagar);
}

//FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO
const eliminarCarrito = (prodId) => {
    const item = carrito.find((tabla) => tabla.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    generarContenidoCarrito();
    guardarEnStorage();
    }

//FUNCION PARA GUARDAR EL CARRITO EN EL LOCAL STORAGE
function guardarEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// FUNCION PARA CARGAR EL CARRITO DESDE EL LOCAL STORAGE
window.addEventListener("load", () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
});

//ALERTAS
//FUNCION PARA ALERTA DE BOTON AÑADIR
const manejarAñadirAlCarrito = (tabla) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon: 'success',
        iconColor: '#a89c8bc4',
        title: `Se añadió ${tabla.nombre} al carrito`
    });
}

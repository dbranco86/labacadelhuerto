/*
//CONSTRUCTOR DE OBJETOS
class Producto {
    constructor(nombre, precio) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = Number (precio);
    }
    mensaje(){
        alert("Seleccione un producto de la lista" + this.nombre +" " + this.precio);
    }
}

//CREO OBJETOS
const PRODUCTO_1 = new Producto ("EMPANADA", "10");
const PRODUCTO_2 = new Producto ("HAMBURGUESA", "15"); 
const PRODUCTO_3 = new Producto ("MILANESA", "20");
const PRODUCTO_4 = new Producto ("REFRESCO", "5");

//CREO ARRAY DE PRODUCTOS
const productos = [
    PRODUCTO_1,
    PRODUCTO_2,
    PRODUCTO_3,
    PRODUCTO_4
];

//CREO ARRAY DE CARRITO
let carrito = [];

const TIPO_MONEDA = "USD";
let pregunta;
let cantidad;
let todosLosProductos = productos.map((producto) => producto.nombre + " " + producto.precio + " " + TIPO_MONEDA);

//EVALUANDO DIFERENTES CONDICIONES
do {
    pregunta = prompt("Bienvenido a Fast Food, desea realizar una compra Si(S) No (N)");
}
while (!validarRespuesta(pregunta));

if (pregunta.toUpperCase() == "S"){    
    alert("Bienvenido a Fast Food \n" + "A continuación la lista de productos");
}else if(pregunta.toUpperCase() == "N"){
    alert("Gracias por visitarnos, nos vemos en la próxima!");
}

while (pregunta.toUpperCase() != "N"){
    let producto = prompt ("Seleccione un producto: \n" + "Lista de Insumos y Precios: \n\n" + todosLosProductos.join("\n")).toUpperCase();
    let precio = 0;
    let condicion = true;
    while(condicion){
        if (validarProducto(producto)){    
            let productoSeleccionado = productos.find((p) => p.nombre.toUpperCase() === producto.toUpperCase());
            precio = productoSeleccionado.precio;
            // PIDE LA CANTIDAD //
            do {
                cantidad = parseInt (prompt ("Ingrese la cantidad: "));
                //AGREGO PRODUCTO AL CARRITO
                if (cantidad > 0) {
                    // AGREGO PRODUCTO AL CARRITO
                    carrito.push({
                        producto, 
                        cantidad, 
                        precio
                    });
                    condicion = false;
                }            
            }
            while (validarCantidad(cantidad));
        }else {
                alert ("Ingrese un producto correcto");
                producto = prompt ("Seleccione un producto: \n" + "Lista de Insumos y Precios: \n\n" + todosLosProductos.join("\n")); 
        }
    }   
    //EVALUA CONDICION
    do{
        pregunta = prompt("Desea seguir comprando? (S / N)");
    }
    while (!validarRespuesta(pregunta));    
    
    //MUESTRA LO QUE HAY EN EL CARRITO 
    while (pregunta.toUpperCase() == "N"){
        alert("Gracias por su compra.");
        carrito.forEach((carritoFinal)=>{
        console.log (`Producto: ${carritoFinal.producto}, Cantidad: ${carritoFinal.cantidad}, Total a pagar por producto: ${carritoFinal.cantidad * carritoFinal.precio}`)        
        });
    break; 
    }
}
let suPedido = carrito.map((producto) => producto.producto + " " + producto.precio * producto.cantidad + " " + TIPO_MONEDA);
alert("A continuación su pedido: \n\n" + suPedido.join("\n"));

// FUNCIONES //
function validarProducto(producto) {
    const productosValidos = [productos[0].nombre, productos[1].nombre, productos[2].nombre, productos[3].nombre];
    return productosValidos.includes(producto.toUpperCase());
}

function validarRespuesta(seleccion) {
    return seleccion.toUpperCase() === "S" || seleccion.toUpperCase() === "N";
}

function validarCantidad(seleccion) {
    return seleccion === isNaN || seleccion <= 0;
}

function mensaje(producto){
    alert("Usted ha escogido" + " " + producto);
}

const totalCompra = carrito.reduce((a, b) => a + b.cantidad * b.precio, 0);
alert (`El total a pagar por su compra es: ${totalCompra} ${TIPO_MONEDA}`);
alert ("Gracias por su vista, lo esperamos pronto!");
*/

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

const TIPO_MONEDA = "s/";

//CAPTURO ID DE TARJETAS
const cheeseboard_1 = document.getElementById ("cheeseboard_1");
const cheeseboard_2 = document.getElementById ("cheeseboard_2");
const cheeseboard_3 = document.getElementById ("cheeseboard_3");
const cheeseboard_4 = document.getElementById ("cheeseboard_4");
const verCarrito = document.getElementById ("verCarrito");
const contenidoCarrito = document.getElementById ("contenidoCarrito");

//CREANDO ELEMENTOS HTML
productos.forEach((tabla, index) =>{
    if (index === 0){
    let contenido = document.createElement("div");
    contenido.innerHTML = `                       
    <h5 class="tarjeta_titulo">${tabla.nombre}</h5>
    <p class="tarjeta_texto">Precio: ${TIPO_MONEDA} ${tabla.precio}</p>
    `;
    cheeseboard_1.append(contenido);
    let boton_anadir = document.createElement ("button");
    boton_anadir.innerText = "Añadir al carrito";
    boton_anadir.className = "card-button btn btn-secondary";
    cheeseboard_1.append(boton_anadir);
    //AGREGAR AL CARRITO
    boton_anadir.addEventListener("click", () => {
        const existe = carrito.some(producto => producto.nombre === tabla.nombre)
        if (existe){
            const productos = carrito.map(producto =>{
                if (producto.nombre === tabla.nombre){
                    producto.cantidad++;
                    producto.total = producto.precio * producto.cantidad;
                    return producto
                }else{
                    return producto
                }
            });
            carrito = [...productos]
        }else{
            carrito.push({
                id: tabla.id,
                nombre: tabla.nombre,
                precio: tabla.precio,
                cantidad: tabla.cantidad,
                total: tabla.precio * tabla.cantidad,
                imagen: tabla.imagen
            });  
        }
    })
    }else if (index === 1){
        let contenido = document.createElement("div");
        contenido.innerHTML = `                       
        <h5 class="tarjeta_titulo">${tabla.nombre}</h5>
        <p class="tarjeta_texto">Precio: ${TIPO_MONEDA} ${tabla.precio}</p>
        `;
        cheeseboard_2.append(contenido);
        //AGREGAR AL CARRITO
        let boton_anadir = document.createElement ("button");
        boton_anadir.innerText = "Añadir al carrito";
        boton_anadir.className = "card-button btn btn-secondary";
        cheeseboard_2.append(boton_anadir);
        boton_anadir.addEventListener("click", () => {
            const existe = carrito.some(producto => producto.nombre === tabla.nombre)
        if (existe){
            const productos = carrito.map(producto =>{
                if (producto.nombre === tabla.nombre){
                    producto.cantidad++;
                    producto.total = producto.precio * producto.cantidad;
                    return producto
                }else{
                    return producto
                }
            });
            carrito = [...productos]
        }else{
            carrito.push({
                id: tabla.id,
                nombre: tabla.nombre,
                precio: tabla.precio,
                cantidad: tabla.cantidad,
                total: tabla.precio * tabla.cantidad,
                imagen: tabla.imagen
            });  
        }
        })
    }else if (index === 2){
        let contenido = document.createElement("div");
        contenido.innerHTML = `                       
        <h5 class="tarjeta_titulo">${tabla.nombre}</h5>
        <p class="tarjeta_texto">Precio: ${TIPO_MONEDA} ${tabla.precio}</p>
        `;
        cheeseboard_3.append(contenido);
        let boton_anadir = document.createElement ("button");
        boton_anadir.innerText = "Añadir al carrito";
        boton_anadir.className = "card-button btn btn-secondary";
        cheeseboard_3.append(boton_anadir);
        //AGREGAR AL CARRITO
        boton_anadir.addEventListener("click", () => {
            const existe = carrito.some(producto => producto.nombre === tabla.nombre)
        if (existe){
            const productos = carrito.map(producto =>{
                if (producto.nombre === tabla.nombre){
                    producto.cantidad++;
                    producto.total = producto.precio * producto.cantidad;
                    return producto
                }else{
                    return producto
                }
            });
            carrito = [...productos]
        }else{
            carrito.push({
                id: tabla.id,
                nombre: tabla.nombre,
                precio: tabla.precio,
                cantidad: tabla.cantidad,
                total: tabla.precio * tabla.cantidad,
                imagen: tabla.imagen
            });  
        }
        })
    }else if (index === 3){
        let contenido = document.createElement("div");
        contenido.innerHTML = `                       
        <h5 class="tarjeta_titulo">${tabla.nombre}</h5>
        <p class="tarjeta_texto">Precio: ${TIPO_MONEDA} ${tabla.precio}</p>
        `;
        cheeseboard_4.append(contenido);
        //AGREGAR AL CARRITO
        let boton_anadir = document.createElement ("button");
        boton_anadir.innerText = "Añadir al carrito";
        boton_anadir.className = "card-button btn btn-secondary";
        cheeseboard_4.append(boton_anadir);
        boton_anadir.addEventListener("click", () => {
            const existe = carrito.some(producto => producto.nombre === tabla.nombre)
        if (existe){
            const productos = carrito.map(producto =>{
                if (producto.nombre === tabla.nombre){
                    producto.cantidad++;
                    producto.total = producto.precio * producto.cantidad;
                    return producto
                }else{
                    return producto
                }
            });
            carrito = [...productos]
        }else{
            carrito.push({
                id: tabla.id,
                nombre: tabla.nombre,
                precio: tabla.precio,
                cantidad: tabla.cantidad,
                total: tabla.precio * tabla.cantidad,
                imagen: tabla.imagen
            });  
        }
        })
    }
}); 

 //ELIMINAR DEL CARRITO
    const eliminarCarrito = (prodId) => {
    const item = carrito.find((tabla) => tabla.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
    }

//ACTUALIZAR CARRITO
    const actualizarCarrito = () =>{
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
    //CREANDO FUNCION PARA CALCULAR EL TOTAL DE LA COMPRA
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

// CREANDO ESTRUCTURA DEL CARRITO
verCarrito.addEventListener("click", () =>{
    
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
    
    //CREANDO FUNCION PARA CALCULAR EL TOTAL DE LA COMPRA
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
});

fetch('../js/productos.json')
    .then(response => response.json())
    .then(data => {
        const productos = data;
        productos.forEach((tabla) => {
            if (tabla.nombre === "Mesa de Quesos n°3") {
                //SELECCIONAMOS DE FORMA DINAMICA EL ELEMENTO DESDE EL HTML
                const cheeseboardContenido = document.querySelector(`#mesaquesos-3`);
                const contenido = document.createElement("div");
                contenido.innerHTML = `
                    <div class="contenedor_carrito">
                        <div class="color-bg row  flex-wrap">
                            <div class="col-md-4 color-bg d-flex flex-column">
                                <div class="img">
                                    <img class="sombras" src="../imagenes/Tabla3.jpg" alt="">
                                </div>
                                <div role="button">
                                    <a href="../index.html">
                                        <img class="flecha_atras" src="../imagenes/flecha-atras.png" alt="">
                                    </a>
                                    <span class="fw-bold font">Continuar comprando</span> 
                                </div>
                            </div>
                            <div class="col-md-8 color-bg buy-div h-100">
                                <h3 class="font tarjeta_titulo">${tabla.nombre}</h3>
                                <div>
                                    <h4 class="fw-bold font">
                                        Descripción
                                    </h4>
                                    <p class="description-text fw-bold font">
                                        3 Clases de Quesos. <br>
                                        2 clases de fiambres. <br>
                                        Fruta de estación. <br>
                                        Panes. <br>
                                        Frutos secos. <br>
                                        Tabla. <br>
                                    </p>
                                    <div class="align-items-center">
                                        <span class="fw-bold me-2 d-block fs-5 mt-3 font tarjeta_titulo">Precio: ${TIPO_MONEDA} ${tabla.precio} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cheeseboardContenido.appendChild(contenido);
            }
        });
    })
    .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
    });


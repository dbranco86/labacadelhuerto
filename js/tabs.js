// OBTENGO LOS ENLACES DE LA NAVEGACION
const tab1 = document.getElementById('tab-1');
const tab2 = document.getElementById('tab-2');
const tab3 = document.getElementById('tab-3');

// CAPTURO ID DE LOS DIVS
const div1 = document.getElementById('div-1');
const div2 = document.getElementById('div-2');
const div3 = document.getElementById('div-3');

// FUNCION PARA REMOVER LA CLASE 'active' DE TODOS LOS ELEMENTOS DE NAVEGACION
function removerClaseActive() {
    tab1.classList.remove('active');
    tab2.classList.remove('active');
    tab3.classList.remove('active');
}

// FUNCION PARA OCULTAR TODOS LOS DIVS
function ocultarDivs() {
    div1.classList.add('d-none');
    div2.classList.add('d-none');
    div3.classList.add('d-none');
}

// MUESTRO UNICAMENTE EL DIV-1 AL CARGAR EL INDEX
div1.classList.remove('d-none');
div2.classList.add('d-none');
div3.classList.add('d-none');

// CREO EVENTO CLICK PARA LOS ENLACES
tab1.addEventListener('click', function() {
    removerClaseActive();
    ocultarDivs();
    tab1.classList.add('active');
    div1.classList.remove('d-none');
});

tab2.addEventListener('click', function() {
    removerClaseActive();
    ocultarDivs();
    tab2.classList.add('active');
    div2.classList.remove('d-none');
});

tab3.addEventListener('click', function() {
    removerClaseActive();
    ocultarDivs();
    tab3.classList.add('active');
    div3.classList.remove('d-none');
});




//variables
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const year = document.querySelector('#year')
const puertas = document.querySelector('#puertas')
const marca = document.querySelector('#marca')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

//contenedor para los resultados
const resultado = document.querySelector('#resultado')

const max = new Date().getFullYear();
const min = max - 10;

// generar un obj con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAuto(autos); //muestra los autos al cargar
    llenarSelect(); //llena el select de años
})

//event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value
    filtrarAuto();
})
year.addEventListener('change', e => {
    datosBusqueda.year = +e.target.value
    filtrarAuto();
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = +e.target.value
    filtrarAuto();
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = +e.target.value
    filtrarAuto();
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = +e.target.value
    filtrarAuto();
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value
    filtrarAuto();
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value
    filtrarAuto();
})

//funciones
function mostrarAuto (autos){
    limpiarHtml(); //elimina el html previo asi aparece solo lo buscado
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}`

        //insertar en el html
        resultado.appendChild(autoHTML)
    });
}

//limpiar HTML
function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for (let i = max; i >= min ; i--) {
        const opcion = document.createElement('option')
        opcion.value=i
        opcion.textContent=`${i}`
        year.appendChild(opcion); //AGREGO OPCIONES DE AÑOS
    }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor )
        if(resultado.length){
            mostrarAuto(resultado)
        } else{
            noResultado();
        }
}
//error al buscar
function noResultado(){

    limpiarHtml();

    const noResultado = document.createElement('div')
    noResultado.classList.add('alerta', 'error')
    noResultado.textContent = `No hay resultados, intenta con otros terminos de búsqueda`
    resultado.appendChild(noResultado)
}
//callback
function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if (marca) {
        return auto.marca === marca
    }
    return auto;
}
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo; // el precio mayor o igual al minimo
    }
    return auto;
}
function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo; // el precio menor o igual al maximo
    }
    return auto;
}
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto){
    const {color} = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}

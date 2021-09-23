const botonBalance = document.querySelector("#boton-balance");
const seccionBalance = document.querySelector("#seccion-balance");
const botonCategorias = document.querySelector("#boton-categorias");
const seccionCategorias = document.querySelector("#seccion-categorias");
const botonReportes = document.querySelector("#boton-reportes");
const seccionReportes = document.querySelector("#seccion-reportes");
const botonNuevaOperacion = document.querySelector("#boton-nueva-operacion");
const seccionNuevaOperacion = document.querySelector("#seccion-nueva-operacion");

// Función para que se vea la sección de Balance

botonBalance.onclick = () => {
    seccionBalance.classList.remove("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionReportes.classList.add("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");
}

// Función para que se vea la sección de Categorías

botonCategorias.onclick = () => {
    seccionCategorias.classList.remove("is-hidden");
    seccionBalance.classList.add("is-hidden");
    seccionReportes.classList.add("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");
}

// Función para que se vea la sección de Reportes

botonReportes.onclick = () => {
    seccionReportes.classList.remove("is-hidden");
    seccionBalance.classList.add("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");
}

// Función para que se vea el box de Nueva operación

botonNuevaOperacion.onclick = () => {
    seccionNuevaOperacion.classList.remove("is-hidden");
    seccionBalance.classList.add("is-hidden");
}
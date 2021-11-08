const botonBalance = document.querySelector("#boton-balance");
const seccionBalance = document.querySelector("#seccion-balance");
const botonCategorias = document.querySelector("#boton-categorias");
const seccionCategorias = document.querySelector("#seccion-categorias");
const botonReportes = document.querySelector("#boton-reportes");
const seccionReportes = document.querySelector("#seccion-reportes");
const botonNuevaOperacion = document.querySelector("#boton-nueva-operacion");
const seccionNuevaOperacion = document.querySelector("#seccion-nueva-operacion");
const inputNuevaCategoria = document.querySelector("#input-nueva-categoria")
const botonAgregarCategoria = document.querySelector("#boton-agregar-categoria")

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

// Sección Categorías

const categorias = ["Comidas", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"];

// InnerHTML para reportes

/* <section class="section mt-4">
<h3 class="title is-size-4 mb-5">Resumen</h3>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column is-half has-text-weight-semibold">Categoría con mayor ganancia</h4>
    <div class="column is-3 has-text-right">
        <span class="tag is-primary is-light">Categoría</span>
    </div>
    <p class="column has-text-right has-text-success is-3 has-text-weight-semibold">+$100</p>
</div>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column is-half has-text-weight-semibold">Categoría con mayor gasto</h4>
    <div class="column is-3 has-text-right">
        <span class="tag is-primary is-light">Categoría</span>
    </div>
    <p class="column has-text-right has-text-danger is-3 has-text-weight-semibold">-$100</p>
</div>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column is-half has-text-weight-semibold">Categoría con mayor balance</h4>
    <div class="column is-3 has-text-right">
        <span class="tag is-primary is-light">Categoría</span>
    </div>
    <p class="column has-text-right is-3 has-text-weight-semibold">-$100</p>
</div>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column is-half has-text-weight-semibold">Mes con mayor ganancia</h4>
    <div class="column is-3 has-text-right">
        <p>3/11/2021</p>
    </div>
    <p class="column has-text-right has-text-success is-3 has-text-weight-semibold">+$100</p>
</div>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column is-half has-text-weight-semibold">Mes con mayor gasto</h4>
    <div class="column is-3 has-text-right">
        <p>3/11/2021</p>
    </div>
    <p class="column has-text-right has-text-danger is-3 has-text-weight-semibold">-$100</p>
</div>
</section>
<section class="section mt-4">
<h3 class="title is-size-4 mb-5">Totales por categorías</h3>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column has-text-weight-semibold">Categorías</h4>
    <div class="column has-text-right">
        <h4 class="has-text-weight-semibold">Ganancias</h4>
    </div>
    <div class="column has-text-right">
        <h4 class="has-text-weight-semibold">Gastos</h4>
    </div>
    <div class="column has-text-right">
        <h4 class="has-text-weight-semibold">Balance</h4>
    </div>
</div>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column has-text-weight-semibold">Categoría</h4>
    <div class="column has-text-right">
        <h4 class="has-text-success">+$200</h4>
    </div>
    <div class="column has-text-right">
        <h4 class="has-text-danger">-$100</h4>
    </div>
    <div class="column has-text-right">
        <h4>$100</h4>
    </div>
</div>
</section>
<section class="section mt-4">
<h3 class="title is-size-4 mb-5">Totales por mes</h3>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column has-text-weight-semibold">Mes</h4>
    <div class="column has-text-right">
        <h4 class="has-text-weight-semibold">Ganancias</h4>
    </div>
    <div class="column has-text-right">
        <h4 class="has-text-weight-semibold">Gastos</h4>
    </div>
    <div class="column has-text-right">
        <h4 class="has-text-weight-semibold">Balance</h4>
    </div>
</div>
<div class="columns is-mobile is-align-items-center">
    <h4 class="column has-text-weight-semibold">11/2021</h4>
    <div class="column has-text-right">
        <h4 class="has-text-success">+$200</h4>
    </div>
    <div class="column has-text-right">
        <h4 class="has-text-danger">-$100</h4>
    </div>
    <div class="column has-text-right">
        <h4>$100</h4>
    </div>
</div>
</section> */




//Funcion que integra operaciones al html (revisar, es anterior a reduce)
// const convertirOperacionesAHTML = (operaciones) => {
//     acc = ""
//     const operacionesEnHTML = operaciones.map ((operacion) =>{
       
//         acc = acc + `
//         <div class="columns"> 
//             <h3 class="column is-3 has-text-weight-semibold">${operacion.descripcion}</h3>
//             <div class="column is-3" ><p class="tag is-primary is-light">${operacion.categoria}</p></div>
//             <h3 class="column is-2 has-text-grey">${operacion.fecha}</h3>
//             <h3 class="column is-1 ${esGasto(operaciones)} ">${operacion.monto}</h3>
//             <div class="columns column is-offset-1 is-1">
//                 <button class="column is-2 button is-ghost is-size-7">Editar</button>
//                 <button class="button column is-offset-4 is-2 is-ghost is-size-7">Eliminar</button>
//             </div>
//         </div>`
//     })
//     contenedorColumnas.innerHTML = acc
// }

// convertirOperacionesAHTML(operaciones)
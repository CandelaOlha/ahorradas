const botonBalance = document.querySelector("#boton-balance");
const seccionBalance = document.querySelector("#seccion-balance");
const botonCategorias = document.querySelector("#boton-categorias");
const seccionCategorias = document.querySelector("#seccion-categorias");
const botonReportes = document.querySelector("#boton-reportes");
const seccionReportes = document.querySelector("#seccion-reportes");
const botonNuevaOperacion = document.querySelector("#boton-nueva-operacion");
const seccionNuevaOperacion = document.querySelector("#seccion-nueva-operacion");
const inputNuevaCategoria = document.querySelector("#input-nueva-categoria");
const botonAgregarCategoria = document.querySelector("#boton-agregar-categoria");
const selectCategoriasFiltro = document.querySelector("#select-categorias-filtro");
const selectCategoriasNuevaOperacion = document.querySelector("#select-categorias-nueva-operacion");
const contenedorCategorias = document.querySelector("#contenedor-categorias");
const formularioAgregarNuevaOperacion = document.querySelector("#formulario-agregar-nueva-operacion");
const inputDescripcion = document.querySelector("#input-descripcion");
const inputMonto = document.querySelector("#input-monto");
const selectTipo = document.querySelector("#select-tipo");
const inputFecha = document.querySelector("#input-fecha");
const botonCancelarNuevaOperacion = document.querySelector("#boton-cancelar-nueva-operacion");
const botonAgregarNuevaOperacion = document.querySelector("#boton-agregar-nueva-operacion");
const contenedorOperacionesVacio = document.querySelector("#contenedor-operaciones-vacio");
const contenedorCategoriasOperaciones = document.querySelector("#contenedor-categorias-operaciones");
const contenedorOperaciones = document.querySelector("#contenedor-operaciones");
const seccionEditarOperacion = document.querySelector("#seccion-editar-operacion")

// Funciones auxiliares de JSON

const convertirAJSON = (objeto) => {
    const objetoConvertidoAJSON = JSON.stringify(objeto);

    return objetoConvertidoAJSON;
}

const convertirDesdeJSON = (objetoJSON) => {
    const JSONConvertidoAObjeto = JSON.parse(objetoJSON);

    return JSONConvertidoAObjeto;
}

const guardarEnLocalStorage = (objeto, string) => {
    const objetoConvertidoAJSON = convertirAJSON(objeto);
    localStorage.setItem(string, objetoConvertidoAJSON);
}

const leerDesdeLocalStorage = (clave) => {
    const objetoGuardado = localStorage.getItem(clave);
    const objetoDeJavascript = convertirDesdeJSON(objetoGuardado);

    return objetoDeJavascript;
}

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

const obtenerCategorias = () => {
    const categoriasEnLocalStorage = leerDesdeLocalStorage("categorias");
    if (categoriasEnLocalStorage === null) {
        // console.log("retorna categorias por defecto")
        return categorias;
    }
    else {
        console.log("retorna categorias nuevas")
        return categoriasEnLocalStorage;
        // categorias = categoriasEnLocalStorage; (revisar si es necesario)
    }
}

// const agregarNuevasCategoriasAlSelect = () => {
//     const categorias = obtenerCategorias();
//     const categoriasEnHTML = categorias.reduce((acc, elemento) => {
//         return acc + `<option value="${elemento}">${elemento}</option>`
//     }, "");
    
//     selectCategoriasFiltro.innerHTML = categoriasEnHTML;
//     selectCategoriasNuevaOperacion.innerHTML = categoriasEnHTML;
// }

const agregarNuevasCategoriasAlSelect = (select) => {
    const categorias = obtenerCategorias();
    const categoriasEnHTML = categorias.reduce((acc, elemento) => {
        return acc + `<option value="${elemento}">${elemento}</option>`
    }, "");
    
    select.innerHTML = categoriasEnHTML;
}

agregarNuevasCategoriasAlSelect(selectCategoriasFiltro);
agregarNuevasCategoriasAlSelect(selectCategoriasNuevaOperacion);

const mostrarCategoriasEnHTML = () => {
    const categorias = obtenerCategorias();
    const categoriasEnHTML = categorias.reduce((acc, elemento) => {
        return acc + `<div class="columns is-mobile">
        <div class="column">
            <span class="tag is-primary is-light">${elemento}</span>
        </div>
        <div class="column columns is-mobile is-narrow">
            <button class="button is-ghost is-size-7">Editar</button>
            <button class="button is-ghost is-size-7">Eliminar</button>
        </div>
    </div>`
    }, "");
    contenedorCategorias.innerHTML = categoriasEnHTML;
}

mostrarCategoriasEnHTML();

botonAgregarCategoria.onclick = () => {
    const categorias = obtenerCategorias();
    const nuevaCategoria = inputNuevaCategoria.value;
    categorias.push(nuevaCategoria);
    inputNuevaCategoria.value = "";
    guardarEnLocalStorage(categorias, "categorias");
    agregarNuevasCategoriasAlSelect(selectCategoriasFiltro);
    agregarNuevasCategoriasAlSelect(selectCategoriasNuevaOperacion);    
    // agregarNuevasCategoriasAlSelect();
    mostrarCategoriasEnHTML();
}

// Seccion Operaciones

const operaciones = [];


const obtenerOperaciones = () => {
    const operacionesEnLocalStorage = leerDesdeLocalStorage("operaciones");
    if (operacionesEnLocalStorage !== null) {
        return operacionesEnLocalStorage;
    }
}

const mostrarOperacionesEnHTML = () => {
    const operaciones = obtenerOperaciones();
    const operacionesEnHTML = operaciones.reduce((acc, elemento, index) => {
        return acc + `
        <div class="columns"> 
            <h3 class="column is-3 has-text-weight-semibold">${elemento.descripcion}</h3>
            <div class="column is-3" ><p class="tag is-primary is-light">${elemento.categoria}</p></div>
            <h3 class="column is-2 has-text-grey">${elemento.fecha}</h3>
            <h3 class="column is-1">${elemento.monto}</h3>
            <div class="columns column is-offset-1 is-1">
                <button class="column is-2 button is-ghost is-size-7 boton-editar-operacion" id="boton-editar-operaciones-${index}">Editar</button>
                <button class="button column is-offset-4 is-2 is-ghost is-size-7 boton-eliminar-operacion" id="boton-eliminar-operacion-${index}"">Eliminar</button>
            </div>
        </div>`
    }, "");

   

    contenedorOperaciones.innerHTML = operacionesEnHTML;
    crearBotonesEliminar()
    crearBotonesEditar()


    contenedorCategoriasOperaciones.classList.remove("is-hidden");
    contenedorOperaciones.classList.remove("is-hidden");
    contenedorOperacionesVacio.classList.add("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");
    seccionBalance.classList.remove("is-hidden");
}

const crearFormularioEditar = (id) => {
    let operaciones = obtenerOperaciones()
    seccionEditarOperacion.classList.remove("is-hidden")
    seccionBalance.classList.add("is-hidden")

    seccionEditarOperacion.innerHTML = `<div class="box column is-8-desktop is-offset-2-desktop is-12-tablet">
    <h2 class="title is-2 has-text-weight-bold mb-6">Editar operación</h2>
    <div class="field">
        <form action="" method="POST" id="formulario-editar-operacion">
            <div class="field">
                <label class="label" for="descripcion">Descripción</label>
                <div class="control">
                    <input class="input" type="text" name="descripcion" id="input-editar-descripcion" value="${operaciones[id].descripcion}">
                </div>
            </div>
            <div class="field">
                <label class="label" for="monto">Monto</label>
                <div class="control">
                    <input class="input" type="number" name="monto" id="input-editar-monto" value="${operaciones[id].monto}">
                </div>
            </div>
            <div class="field">
                <label class="label" for="tipo">Tipo</label>
                <div class="select is-fullwidth">
                    <select name="tipo" id="select-editar-tipo" value="${operaciones[id].tipo}">
                        <option value="gasto">Gasto</option>
                        <option value="ganancia">Ganancia</option>
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label" for="categoria">Categoría</label>
                <div class="select is-fullwidth">
                    <select name="categoria" id="select-editar-categorias-operacion" value="${operaciones[id].categoria}">
                    </select>
                </div>
            </div>
            <div class="field">
                <label class="label" for="fecha">Fecha</label>
                <div class="control">
                    <input class="input" type="date" name="fecha" id="input-editar-fecha" value="${operaciones[id].fecha}">
                </div>
            </div>
            <div class="column field has-text-right is-mobile mt-6">
                <button class="button is-light" id="boton-cancelar-editar-operacion">Cancelar</button>
                <input type="submit" class="button is-success" id="boton-editar-operacion" value="Editar">
            </div>
        </form>
    </div>
</div>`



    const formularioEditarOperacion = document.querySelector("#formulario-editar-operacion")
    const inputEditarDescripcion = document.querySelector("#input-editar-descripcion")
    const inputEditarMonto = document.querySelector("#input-editar-monto")
    const selectEditarTipo = document.querySelector("#select-editar-tipo")
    const selectEditarCategoria = document.querySelector("#select-editar-categorias-operacion")
    const inputEditarFecha = document.querySelector("#input-editar-fecha")
    
    agregarNuevasCategoriasAlSelect(selectEditarCategoria);

    formularioEditarOperacion.onsubmit = (event) => {
        event.preventDefault()

        let operaciones = obtenerOperaciones()
        
        operaciones[id].descripcion = inputEditarDescripcion.value
        operaciones[id].monto = inputEditarMonto.value
        operaciones[id].tipo = selectEditarTipo.value
        operaciones[id].categoria = selectEditarCategoria.value
        operaciones[id].fecha = inputEditarFecha.value

        seccionEditarOperacion.classList.add("is-hidden")
        seccionBalance.classList.remove("is-hidden")

        guardarEnLocalStorage(operaciones, "operaciones")
        mostrarOperacionesEnHTML()
    }
}

const crearBotonesEliminar = () => {
    const botonesEliminarOperacion = document.querySelectorAll(".boton-eliminar-operacion")
    for (let i = 0; i < botonesEliminarOperacion.length; i++) {
        botonesEliminarOperacion[i].onclick = () => {
           let operaciones = obtenerOperaciones()
           const idBotonEliminarOperacion = Number(botonesEliminarOperacion[i].id.slice(25))
           console.log(idBotonEliminarOperacion)

           const arrayFiltrado = operaciones.filter((elemento, index) =>{
               return index !== idBotonEliminarOperacion
           })
           operaciones = arrayFiltrado
           guardarEnLocalStorage(operaciones, "operaciones")
           mostrarOperacionesEnHTML()
        }
        
    }
}

const crearBotonesEditar = () => {
    const botonesEditarOperacion = document.querySelectorAll(".boton-editar-operacion")
    for (let i = 0; i < botonesEditarOperacion.length; i++) {
        botonesEditarOperacion[i].onclick = () => {
           const idBotonEditarOperacion = Number(botonesEditarOperacion[i].id.slice(25))
           crearFormularioEditar(idBotonEditarOperacion)
        }
    }
}

mostrarOperacionesEnHTML()

formularioAgregarNuevaOperacion.onsubmit = (event) => {
    event.preventDefault()
}

botonAgregarNuevaOperacion.onclick = () => {
    const operaciones = obtenerOperaciones()
    const nuevaOperacion = {
        descripcion: inputDescripcion.value, 
        monto: inputMonto.value, 
        tipo: selectTipo.value, 
        categoria: selectCategoriasNuevaOperacion.value, 
        fecha: inputFecha.value, 
    }

    operaciones.push(nuevaOperacion);
    console.log(operaciones);

    inputDescripcion.value = ""
    inputMonto.value = ""
    selectTipo.value = ""
    selectCategoriasNuevaOperacion.value = ""
    inputFecha.value = ""


    guardarEnLocalStorage(operaciones, "operaciones");

    mostrarOperacionesEnHTML();
}





















// InnerHTML para Reportes

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
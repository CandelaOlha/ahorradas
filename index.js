const menuHamburguesa = document.querySelector(".navbar-burger");
const menuDeNavegacion = document.querySelector(".navbar-menu");
const linksMenu = document.querySelectorAll(".navbar-item");
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
// Declaran esta variable, pero nunca la usan
const botonAgregarNuevaOperacion = document.querySelector("#boton-agregar-nueva-operacion");
const contenedorOperacionesVacio = document.querySelector("#contenedor-operaciones-vacio");
const contenedorCategoriasOperaciones = document.querySelector("#contenedor-categorias-operaciones");
const contenedorOperaciones = document.querySelector("#contenedor-operaciones");
const seccionEditarOperacion = document.querySelector("#seccion-editar-operacion")
const totalGanancias = document.querySelector("#ganancias");
const totalGastos = document.querySelector("#gastos");
const total = document.querySelector("#total");
const seccionEditarCategoria = document.querySelector("#seccion-editar-categoria");
const botonOcultarFiltros = document.querySelector("#boton-ocultar-filtros");
const contenedorFiltros = document.querySelector("#contenedor-filtros");
const selectFiltroTipo = document.querySelector("#select-filtro-tipo");
const inputFiltroFecha = document.querySelector("#input-filtro-fecha");
const selectFiltroOrden = document.querySelector("#select-filtro-orden");
const contenedorReportes = document.querySelector("#contenedor-reportes");
const contenedorReportesVacios = document.querySelector("#contenedor-reportes-vacios");

// Funciones auxiliares de JSON

// No lo considero un error a esta altura, pero sí es bueno que vayan dandose cuenta cuándo las variables
// son innecesarias. Dejo este comentario solo para que vayan pensando en este tema. 
// Al principio, mientras mas variables declaramos, mejor, ya que nos permite entender mejor nuestro codigo
// A medida que vayan ganando experiencia y confianza, es bueno ir dejando cierta abstracción en nuestro 
// codigo para reducir su tamaño. Asi, evitamos algunas variables porque suponemos que el lector (y nosotras mismas)
// sabemos lo que esta pasando. Tambien podemos aprovechar el retorno implicito como vimos en clases pasadas. 
// Esta funcion, por ejemplo, puede convertirse asi:

// const convertirAJSON = (objeto) => JSON.stringify(objeto);

// Queda mucho mas breve y (para un dev con algo de experiencia, como serán ustedes en unos meses) mucho mas claro :)

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

// Menú para celulares

menuHamburguesa.onclick = () => {
    menuHamburguesa.classList.toggle("is-active");
    menuDeNavegacion.classList.toggle("is-active");
}

for (let i = 0; i < linksMenu.length; i++) {
    linksMenu[i].onclick = () => {
        menuHamburguesa.classList.remove("is-active");
        menuDeNavegacion.classList.remove("is-active");
    }
}

// Mostrar y ocultar secciones (ver si podemos tener una función auxiliar para esto)

// Estas tres funciones son muy parecidas entre sí. Piensen de alguna manera de abstraerlas, es decir, 
// una funcion que por ejemplo reciba la seccion que queremos mostrar, y la funcion misma sepa 
// que elementos mostrar y cuales ocultar
botonBalance.onclick = () => {
    seccionBalance.classList.remove("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionReportes.classList.add("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");
}

botonCategorias.onclick = () => {
    seccionCategorias.classList.remove("is-hidden");
    seccionBalance.classList.add("is-hidden");
    seccionReportes.classList.add("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");
}

botonReportes.onclick = () => {
    seccionReportes.classList.remove("is-hidden");
    seccionBalance.classList.add("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");

    const operaciones = obtenerOperaciones();

    if (operaciones.length >= 3) {
        contenedorReportesVacios.classList.add("is-hidden");
        mostrarReportes();
    }
}

botonNuevaOperacion.onclick = () => {
    seccionNuevaOperacion.classList.remove("is-hidden");
    seccionBalance.classList.add("is-hidden");
}

// Mostrar u ocultar filtros

botonOcultarFiltros.onclick = () => {
    contenedorFiltros.classList.toggle("is-hidden");

    if (botonOcultarFiltros.textContent === "Ocultar filtros") {
        botonOcultarFiltros.textContent = "Mostrar filtros";
    }
    else {
        botonOcultarFiltros.textContent = "Ocultar filtros";
    }
}

// Sección Categorías

// Como esta variable solo es necesaria para la funcion obtenerCategorias, estaria bueno que 
// sea declarada solamente dentro de la funcion. 
// Limitar el scope de una variable (hacer que sea solo accesible desde la funcion en donde esta declarada)
// es una buena manera de evitar errores a futuro: nadie va a poder modificar esta variable por error. 
const categorias = ["Comidas", "Servicios", "Salidas", "Educación", "Transporte", "Trabajo"];

const obtenerCategorias = () => {
    const categoriasEnLocalStorage = leerDesdeLocalStorage("categorias");

    if (categoriasEnLocalStorage === null) {
        return categorias;
    }
    else {
        return categoriasEnLocalStorage;
        // No dejen codigo comentado en una entrega
        // categorias = categoriasEnLocalStorage; (revisar si es necesario)
    }
}

const agregarNuevasCategoriasAlSelect = (select) => {
    const categorias = obtenerCategorias();

    const categoriasEnHTML = categorias.reduce((acc, elemento) => {
        return acc + `<option value="${elemento}">${elemento}</option>`
    }, "");
    
    select.innerHTML = categoriasEnHTML;
}

const agregarNuevasCategoriasAlSelectFiltro = (select) => {
    const categorias = obtenerCategorias();

    const categoriasEnHTML = categorias.reduce((acc, elemento) => {
        return acc + `<option value="${elemento}">${elemento}</option>`
    }, "<option value='todas'>Todas</option>");
    
    select.innerHTML = categoriasEnHTML;
}

agregarNuevasCategoriasAlSelectFiltro(selectCategoriasFiltro);
agregarNuevasCategoriasAlSelect(selectCategoriasNuevaOperacion);

const mostrarCategoriasEnHTML = () => {
    const categorias = obtenerCategorias();

    const categoriasEnHTML = categorias.reduce((acc, elemento, index) => {
        return acc + `<div class="columns is-mobile">
        <div class="column">
            <span class="tag is-primary is-light">${elemento}</span>
        </div>
        <div class="column columns is-mobile is-narrow">
            <button class="button is-ghost is-size-7 boton-editar-categoria" id="boton-editar-categoria-${index}">Editar</button>
            <button class="button is-ghost is-size-7 boton-eliminar-categoria" id="boton-eliminar-categoria-${index}">Eliminar</button>
        </div>
    </div>`
    }, "");

    contenedorCategorias.innerHTML = categoriasEnHTML;

    crearBotonesEditarCategoria();
    crearBotonesEliminarCategoria();
}

botonAgregarCategoria.onclick = () => {
    const categorias = obtenerCategorias();
    const nuevaCategoria = inputNuevaCategoria.value;

    categorias.push(nuevaCategoria);

    inputNuevaCategoria.value = "";

    guardarEnLocalStorage(categorias, "categorias");
    // aqui deberiamos llamar a la funcion agregarNuevasCategoriasAlSelectFiltro, asi tenemos el "todas". 
    // Esto causa un error en su pagina: cuando agrego una nueva categoria, ya no puedo filtrar por "todas"
    // las categorias. 
    agregarNuevasCategoriasAlSelect(selectCategoriasFiltro);
    agregarNuevasCategoriasAlSelect(selectCategoriasNuevaOperacion);    
    mostrarCategoriasEnHTML();
}

const crearFormularioEditarCategoria = (id) => {
    // Esta funcion es muy larga, y esta haciendo muchas cosas a la vez. 
    // Seria bueno poder mejorar su claridad haciendo funciones auxiliares que se llamen desde aqui
    // Por ejemplo: 
    // agregarHTMLFormularioCategorias()
    // manejarSubmitFormularioCategorias()
    // manejarCancelarAgregarCategorias()


    const categorias = obtenerCategorias();

    seccionEditarCategoria.classList.remove("is-hidden")
    seccionCategorias.classList.add("is-hidden")

    seccionEditarCategoria.innerHTML = `
    <div class="box column is-8-desktop is-offset-2-desktop is-12-tablet" id="contenedor-formulario-editar-categoria">
        <h2 class="title is-2 has-text-weight-bold mb-6">Editar categoría</h2>
        <div class="field mb-6">
            <form action="" method="POST" id="formulario-editar-categoria">
                <label class="label" for="editar-categoria">Nombre</label>
                <div class="control">
                    <input class="input" type="text" name="editar-categoria" value="${categorias[id]}" id="input-editar-categoria">
                </div>
                <div class="is-flex is-justify-content-flex-end">
                    <button class="button is-light mr-2" id="boton-cancelar-editar-categoria" type="button">Cancelar</button>
                    <input type="submit" value="Editar" class="button is-success">
                </div>
            </form>
        </div>
    </div>
    `
    
    const formularioEditarCategoria = document.querySelector("#formulario-editar-categoria");
    const contenedorFormularioEditarCategoria = document.querySelector('#contenedor-formulario-editar-categoria')
    const inputEditarCategoria = document.querySelector("#input-editar-categoria");

    formularioEditarCategoria.onsubmit = (event) => {
        event.preventDefault();

        const categorias = obtenerCategorias();

        categorias[id] = inputEditarCategoria.value;

        seccionEditarCategoria.classList.add("is-hidden");
        seccionCategorias.classList.remove("is-hidden");

        guardarEnLocalStorage(categorias, "categorias");
        mostrarCategoriasEnHTML();
    }

    const botonCancelarEditarCategoria = document.querySelector("#boton-cancelar-editar-categoria");

    botonCancelarEditarCategoria.onclick = () => {
        formularioEditarCategoria.classList.add("is-hidden");
        contenedorFormularioEditarCategoria.classList.add('is-hidden')
        seccionCategorias.classList.remove("is-hidden");
    }
}

const crearBotonesEditarCategoria = () => {
    const botonesEditarCategoria = document.querySelectorAll(".boton-editar-categoria");

    for (let i = 0; i < botonesEditarCategoria.length; i++) {
        botonesEditarCategoria[i].onclick = () => {
           const idBotonEditarCategoria = Number(botonesEditarCategoria[i].id.slice(23));
        //    No dejen console log en una entrega
           console.log(idBotonEditarCategoria);
           crearFormularioEditarCategoria(idBotonEditarCategoria);
        }
    }
}

const crearBotonesEliminarCategoria = () => {
    const botonesEliminarCategoria = document.querySelectorAll(".boton-eliminar-categoria");
    
    for (let i = 0; i < botonesEliminarCategoria.length; i++) {
        botonesEliminarCategoria[i].onclick = () => {
           let categorias = obtenerCategorias()
           const idBotonEliminarCategoria = Number(botonesEliminarCategoria[i].id.slice(25))
           const arrayCategoriasFiltrado = categorias.filter((elemento, index) => {
               return index !== idBotonEliminarCategoria
           })
           categorias = arrayCategoriasFiltrado
           guardarEnLocalStorage(categorias, "categorias")
           mostrarCategoriasEnHTML()
        }
    }
}

// Es confuso tratar de entender el flujo de ejecucion del codigo si tenemos mezcladas las funciones auxiliares
// con ejecuciones como esta, que ocurren apenas carga la pagina. 
// Traten de dejar siempre estas ejecuciones al final de todo
// Asi es mas facil entender qué ocurre primero y qué ocurre después
mostrarCategoriasEnHTML();

// Sección Operaciones

// Misma observacion aqui que en la variable categorias
const operaciones = [];

const obtenerOperaciones = () => {
    const operacionesEnLocalStorage = leerDesdeLocalStorage("operaciones");

    if (operacionesEnLocalStorage !== null) {
        return operacionesEnLocalStorage;
    }
    else {
        return operaciones
    }
}

const obtenerGanancias = () => {
    const operaciones = obtenerOperaciones();

    const ganancias = operaciones.filter((elemento) => {
        return elemento.tipo === "ganancia";
    })

    const total = ganancias.reduce((acc, elemento) => {
        return acc + Number(elemento.monto);
      }, 0);

    totalGanancias.textContent = `+${total}`;

    return total;
}

const obtenerGastos = () => {
    const operaciones = obtenerOperaciones();

    const gastos = operaciones.filter((elemento) => {
        return elemento.tipo === "gasto";
    })

    const total = gastos.reduce((acc, elemento) => {
        return acc + Number(elemento.monto);
      }, 0);

    totalGastos.textContent = `-${total}`;

    return total;
}

const obtenerTotal = () => {
    const ganancias = obtenerGanancias();
    const gastos = obtenerGastos();

    const resultado = ganancias - gastos;

    total.textContent = resultado;
}

const aplicarColorAlMonto = (objeto) => {
    if (objeto.tipo === "ganancia") {
        return "has-text-success";
    }
    else {
        return "has-text-danger";
    }
}

const aplicarSignoAlMonto = (objeto) => {
    if (objeto.tipo === "ganancia") {
        return "+$"
    }
    else {
        return "-$"
    }
}

const mostrarOperacionesEnHTML = (array) => {
    const operacionesEnHTML = array.reduce((acc, elemento, index) => {
        return acc + `
        <div class="columns"> 
            <h3 class="column is-3 has-text-weight-semibold">${elemento.descripcion}</h3>
            <div class="column is-3" ><p class="tag is-primary is-light">${elemento.categoria}</p></div>
            <h3 class="column is-2 has-text-grey">${elemento.fecha}</h3>
            <h3 class="column is-1 has-text-weight-bold ${aplicarColorAlMonto(elemento)}">${aplicarSignoAlMonto(elemento)}${elemento.monto}</h3>
            <div class="columns column is-offset-1 is-1">
                <button class="column is-2 button is-ghost is-size-7 boton-editar-operacion" id="boton-editar-operaciones-${index}">Editar</button>
                <button class="button column is-offset-4 is-2 is-ghost is-size-7 boton-eliminar-operacion" id="boton-eliminar-operacion-${index}">Eliminar</button>
            </div>
        </div>`
    }, "");

    contenedorOperaciones.innerHTML = operacionesEnHTML;

    // perfecto uso de funciones auxiliares aca
    crearBotonesEliminar()
    crearBotonesEditar()

    // Esto podria estar en una funcion auxiliar
    if (array.length > 0) {
        contenedorCategoriasOperaciones.classList.remove("is-hidden");
        contenedorOperaciones.classList.remove("is-hidden");
        contenedorOperacionesVacio.classList.add("is-hidden");
        seccionNuevaOperacion.classList.add("is-hidden");
        seccionBalance.classList.remove("is-hidden");
    }
    else {
        contenedorCategoriasOperaciones.classList.add("is-hidden");
        contenedorOperaciones.classList.add("is-hidden");
        contenedorOperacionesVacio.classList.remove("is-hidden");
        seccionNuevaOperacion.classList.add("is-hidden");
        seccionBalance.classList.remove("is-hidden");
    }
}

const crearFormularioEditar = (id) => {
    const operaciones = obtenerOperaciones()

    seccionEditarOperacion.classList.remove("is-hidden")
    seccionBalance.classList.add("is-hidden")

    seccionEditarOperacion.innerHTML = `
    <div class="box column is-8-desktop is-offset-2-desktop is-12-tablet" id="contenedor-formulario-editar-operacion">
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
                <button class="button is-light" id="boton-cancelar-editar-operacion" type="button">Cancelar</button>
                <input type="submit" class="button is-success" id="boton-editar-operacion" value="Editar">
            </div>
        </form>
    </div>
</div>`

    const formularioEditarOperacion = document.querySelector("#formulario-editar-operacion")
    const contenedorFormularioEditarOperacion = document.querySelector("#contenedor-formulario-editar-operacion")
    const inputEditarDescripcion = document.querySelector("#input-editar-descripcion")
    const inputEditarMonto = document.querySelector("#input-editar-monto")
    const selectEditarTipo = document.querySelector("#select-editar-tipo")
    const selectEditarCategoria = document.querySelector("#select-editar-categorias-operacion")
    const inputEditarFecha = document.querySelector("#input-editar-fecha")
    
    agregarNuevasCategoriasAlSelect(selectEditarCategoria);

    selectEditarTipo.value = operaciones[id].tipo;
    selectEditarCategoria.value = operaciones[id].categoria;

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

        // perfecto uso de funciones auxiliares aqui - agreguenlo al resto de esta funcion, el codigo
        // de arriba es muy largo!
        guardarEnLocalStorage(operaciones, "operaciones")
        mostrarOperacionesEnHTML(obtenerOperaciones())
        obtenerGanancias();
        obtenerGastos();
        obtenerTotal();
    }

    const botonCancelarEditarOperacion = document.querySelector("#boton-cancelar-editar-operacion");

    botonCancelarEditarOperacion.onclick = () => {
        formularioEditarOperacion.classList.add("is-hidden");
        contenedorFormularioEditarOperacion.classList.add("is-hidden")
        seccionBalance.classList.remove("is-hidden");
    }
}

const crearBotonesEliminar = () => {
    const botonesEliminarOperacion = document.querySelectorAll(".boton-eliminar-operacion")

    for (let i = 0; i < botonesEliminarOperacion.length; i++) {
        botonesEliminarOperacion[i].onclick = () => {
           let operaciones = obtenerOperaciones()
           const idBotonEliminarOperacion = Number(botonesEliminarOperacion[i].id.slice(25))
           const arrayFiltrado = operaciones.filter((elemento, index) => {
               return index !== idBotonEliminarOperacion
           })
           operaciones = arrayFiltrado
           guardarEnLocalStorage(operaciones, "operaciones")
           mostrarOperacionesEnHTML(obtenerOperaciones())
           obtenerGanancias();
           obtenerGastos();
           obtenerTotal();
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

const ordernarOperacionesPorFecha = () => {
    const operaciones = obtenerOperaciones()

    const operacionesOrdenadas = operaciones.sort((a, b) => {
        return new Date(b.fecha) - new Date(a.fecha)
    })

    mostrarOperacionesEnHTML(operacionesOrdenadas)
}

mostrarOperacionesEnHTML(obtenerOperaciones())
obtenerGanancias();
obtenerGastos();
obtenerTotal();
ordernarOperacionesPorFecha()

formularioAgregarNuevaOperacion.onsubmit = (event) => {
    event.preventDefault()
    
    const operaciones = obtenerOperaciones()
    const nuevaOperacion = {
        descripcion: inputDescripcion.value, 
        monto: inputMonto.value, 
        tipo: selectTipo.value, 
        categoria: selectCategoriasNuevaOperacion.value, 
        fecha: inputFecha.value, 
    }

    operaciones.push(nuevaOperacion);

    inputDescripcion.value = ""
    inputMonto.value = ""
    selectTipo.value = ""
    selectCategoriasNuevaOperacion.value = ""
    inputFecha.value = ""

    guardarEnLocalStorage(operaciones, "operaciones");
    mostrarOperacionesEnHTML(obtenerOperaciones());
    obtenerGanancias();
    obtenerGastos();
    obtenerTotal();
}

botonCancelarNuevaOperacion.onclick = () => {
    seccionNuevaOperacion.classList.add("is-hidden");
    seccionBalance.classList.remove("is-hidden");
}

// Filtros

const aplicarfiltroOrden = (array) => {
    if (selectFiltroOrden.value === "mas-reciente") {
        return array.sort((a, b) => {
            return new Date(b.fecha) - new Date(a.fecha);
        })
    }
    else if (selectFiltroOrden.value === "menos-reciente") {
        return array.sort((a, b) => {
            return new Date(a.fecha) - new Date(b.fecha);
        }) 
    }
    else if (selectFiltroOrden.value === "mayor-monto") {
        return array.sort((a, b) => {
            return b.monto - a.monto;
        })
    }
    else if (selectFiltroOrden.value === "menor-monto") {
        return array.sort((a, b) => {
            return a.monto - b.monto;
        })
    }
    else if (selectFiltroOrden.value === "a-z") {
        return array.sort((a, b) => {
            // No lo vimos y este uso es perfecto :D !
            return a.descripcion.localeCompare(b.descripcion); // Este método no sé si lo vimos en clase. Lo encontré en la web de W3Schools. Compara y ordena strings.
        })
    }
    else if (selectFiltroOrden.value === "z-a") {
        return array.sort((a, b) => {
            return b.descripcion.localeCompare(a.descripcion);
        })
    }
}

const aplicarFiltros = () => {
    const operaciones = obtenerOperaciones();

    const filtradoPorTipo = operaciones.filter((elemento) => {
        if (selectFiltroTipo.value === "todos") {
            return elemento ;
        }
        else { 
            return elemento.tipo === selectFiltroTipo.value
        }
    })

    const filtradoPorCategoria = filtradoPorTipo.filter((elemento) => {
        if (selectCategoriasFiltro.value === "todas") {
            return elemento
        }
        else {
            return elemento.categoria === selectCategoriasFiltro.value
        }
    })

    const filtradoPorOrden = aplicarfiltroOrden(filtradoPorCategoria)
    
    const filtradoPorFecha = filtradoPorOrden.filter((elemento) => {
        if (inputFiltroFecha.value) {
            return new Date(elemento.fecha) >= new Date(inputFiltroFecha.value)
        }
        else {
            return elemento
        }
    })

    return filtradoPorFecha
}

selectFiltroTipo.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    mostrarOperacionesEnHTML(arrayFiltrado)
}
 
selectCategoriasFiltro.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    // ojo con dejar console log olvidados
    console.log(arrayFiltrado)
    mostrarOperacionesEnHTML(arrayFiltrado)
}

inputFiltroFecha.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    mostrarOperacionesEnHTML(arrayFiltrado)
}

selectFiltroOrden.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    mostrarOperacionesEnHTML(arrayFiltrado)
}

// Sección Reportes

const obtenerCategoriaConMayorGanancia = (array) => {
    const ganancias = array.filter((elemento) => {
        return elemento.tipo === "ganancia";
    })

    const operacionConMayorGanancia = ganancias.reduce((acc, elemento) => {
        if (Number(elemento.monto) > Number(acc.monto)) {
            acc = elemento;
        }
        return acc;
    })

    return operacionConMayorGanancia.categoria;
   }

const sumaCategoriaConMayorGanancia = (array) => {
    const categoriaConMayorGanancia = obtenerCategoriaConMayorGanancia(array);

    const operacionesCategoriaMayorGanancia = array.filter((elemento) => {
        return elemento.categoria === categoriaConMayorGanancia && elemento.tipo === "ganancia";
    })

    const sumaGanancias = operacionesCategoriaMayorGanancia.reduce((acc, elemento) => {
        return acc + Number(elemento.monto);
    }, 0) 

    return sumaGanancias;
}

const obtenerCategoriaConMayorGasto = (array) => {
    const gastos = array.filter((elemento) => {
        return elemento.tipo === "gasto";
    })

    const operacionConMayorGasto = gastos.reduce((acc, elemento) => {
        if (Number(elemento.monto) > Number(acc.monto)) {
            acc = elemento;
        }
        return acc;
    })

    return operacionConMayorGasto.categoria;
   }

const sumaCategoriaConMayorGasto = (array) => {
    const categoriaConMayorGasto = obtenerCategoriaConMayorGasto(array);

    const operacionesCategoriaMayorGasto = array.filter((elemento) => {
        return elemento.categoria === categoriaConMayorGasto && elemento.tipo === "gasto";
    })

    const sumaGastos = operacionesCategoriaMayorGasto.reduce((acc, elemento) => {
        return acc + Number(elemento.monto);
    }, 0) 

    return sumaGastos;
}

// Nos quedó pendiente:
// Categoría con mayor balance
// Mes con mayor ganancia
// Mes con mayor gasto

// Gracias por dejarlo anotado! si quieren seguir con eso me escriben :)

const mostrarReportes = () => {
    const operaciones = obtenerOperaciones();

        contenedorReportes.innerHTML = `
        <section class="section mt-4">
        <h3 class="title is-size-4 mb-5">Resumen</h3>
        <div class="columns is-mobile is-align-items-center">
            <h4 class="column is-half has-text-weight-semibold">Categoría con mayor ganancia</h4>
            <div class="column is-3 has-text-right">
                <span class="tag is-primary is-light">${obtenerCategoriaConMayorGanancia(operaciones)}</span>
            </div>
            <p class="column has-text-right has-text-success is-3 has-text-weight-semibold">+$${sumaCategoriaConMayorGanancia(operaciones)}</p>
        </div>
        <div class="columns is-mobile is-align-items-center">
            <h4 class="column is-half has-text-weight-semibold">Categoría con mayor gasto</h4>
            <div class="column is-3 has-text-right">
                <span class="tag is-primary is-light">${obtenerCategoriaConMayorGasto(operaciones)}</span>
            </div>
            <p class="column has-text-right has-text-danger is-3 has-text-weight-semibold">-$${sumaCategoriaConMayorGasto(operaciones)}</p>
        </div>
        <div class="columns is-mobile is-align-items-center">
            <h4 class="column is-half has-text-weight-semibold">Categoría con mayor balance</h4>
            <div class="column is-3 has-text-right">
                <span class="tag is-primary is-light">Categoría</span>
            </div>
            <p class="column has-text-right is-3 has-text-weight-semibold">-$0</p>
        </div>
        <div class="columns is-mobile is-align-items-center">
            <h4 class="column is-half has-text-weight-semibold">Mes con mayor ganancia</h4>
            <div class="column is-3 has-text-right">
                <p>0/00/0000</p>
            </div>
            <p class="column has-text-right has-text-success is-3 has-text-weight-semibold">+$0</p>
        </div>
        <div class="columns is-mobile is-align-items-center">
            <h4 class="column is-half has-text-weight-semibold">Mes con mayor gasto</h4>
            <div class="column is-3 has-text-right">
                <p>0/00/0000</p>
            </div>
            <p class="column has-text-right has-text-danger is-3 has-text-weight-semibold">-$0</p>
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
        <div class="columns is-flex is-flex-direction-column is-mobile" id="contenedor-totales-categorias">
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
        <div class="columns is-flex is-flex-direction-column is-mobile" id="contenedor-totales-mes">
        </div>
        </section>
        `

        const contenedorTotalesCategorias = document.querySelector("#contenedor-totales-categorias");
        const contenedorTotalesMes = document.querySelector("#contenedor-totales-mes");

        contenedorTotalesCategorias.innerHTML = agregarTotalesPorCategorias();   
        contenedorTotalesMes.innerHTML = agregarTotalesPorMes();   
}

// Totales por categoría 

const separarPorCategoria = () => { // Devuelve un array de operaciones separadas por categoría

    const categorias = obtenerCategorias();
    const operaciones = obtenerOperaciones();

    let arrayOperacionesPorCategoria = [];

    categorias.map((elemento) => {
        arrayOperacionesPorCategoria.push([]);
    })

    operaciones.map((elemento) => {
        const indiceCategoria = categorias.indexOf(elemento.categoria);
        arrayOperacionesPorCategoria[indiceCategoria].push(elemento)
    })

    return arrayOperacionesPorCategoria;
}

const obtenerGananciasPorCategorias = (indiceCategoria) => {
    const operacionesPorCategoria = separarPorCategoria();
    const operacionesCategoriaElegida = operacionesPorCategoria[indiceCategoria];
  
    let sumaGananciasPorCategoria = 0;
  
    const gananciasPorCategoria = operacionesCategoriaElegida.filter((elemento) => {
        return elemento.tipo === "ganancia";
      }
    );
  
    sumaGananciasPorCategoria = gananciasPorCategoria.reduce((acc, elemento) => {
      return acc + Number(elemento.monto);
    }, 0);
  
    return sumaGananciasPorCategoria;
  };

const obtenerGastosPorCategorias = (indiceCategoria) => {
    const operacionesPorCategoria = separarPorCategoria();
    const operacionesCategoriaElegida = operacionesPorCategoria[indiceCategoria];
  
    let sumaGastosPorCategoria = 0;
  
    const gastosPorCategoria = operacionesCategoriaElegida.filter((elemento) => {
        return elemento.tipo === "gasto";
      }
    );
  
    sumaGastosPorCategoria = gastosPorCategoria.reduce((acc, elemento) => {
      return acc + Number(elemento.monto);
    }, 0);
  
    return sumaGastosPorCategoria;
};

const obtenerBalancePorCategorias = (indiceCategoria) => {
    const operacionesPorCategoria = separarPorCategoria();
    const operacionesCategoriaElegida = operacionesPorCategoria[indiceCategoria];


    // No es necesario usar un reduce aqui - podrian hacer simplemente gananciasPorCategoria - gastosPorCategoria;
    // Una buena regla aqui es: Si no usan la acumuladora, no necesitan el reduce
    const totalesPorCategoria = operacionesCategoriaElegida.reduce((acc, elemento) => {
        const gananciasPorCategoria = obtenerGananciasPorCategorias(indiceCategoria);
        const gastosPorCategoria = obtenerGastosPorCategorias(indiceCategoria);

        return gananciasPorCategoria - gastosPorCategoria;
    }, 0)

    return totalesPorCategoria;
}

const agregarTotalesPorCategorias = () => {
    const categorias = obtenerCategorias();

    const totalesPorCategorias = categorias.reduce((acc, elemento, index) => {
        return acc + `
            <div class="column columns my-0 py-0">
                <h4 class="column has-text-weight-semibold">${elemento}</h4>
                <div class="column has-text-right">
                    <h4 class="has-text-success">+$${obtenerGananciasPorCategorias(index)}</h4>
                </div>
                <div class="column has-text-right">
                    <h4 class="has-text-danger">-$${obtenerGastosPorCategorias(index)}</h4>
                </div>
                <div class="column has-text-right">
                    <h4>$${obtenerBalancePorCategorias(index)}</h4>
                </div>
            </div>
        `
    }, "")

    return totalesPorCategorias;
}

// Totales por mes

const separarOperacionesPorMes = () => {
    const meses = [0, 1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const operaciones = obtenerOperaciones()

    const operacionesPorMes = []

    meses.map((mes) => {
        operacionesPorMes.push([])
    })

    operaciones.map((elemento) => {
        const fecha = new Date(elemento.fecha + " 11:00:00 ")
        const mes = fecha.getMonth()

        operacionesPorMes[mes].push(elemento)
      })

      return operacionesPorMes
}

const obtenerGananciasPorMes = (indiceMes) => {
    const operacionesPorMes = separarOperacionesPorMes();
    const operacionesMesElegido = operacionesPorMes[indiceMes];
  
    let sumaGananciasPorMes = 0;
  
    const gananciasPorMes = operacionesMesElegido.filter((elemento) => {
        return elemento.tipo === "ganancia";
      }
    );
  
    sumaGananciasPorMes = gananciasPorMes.reduce((acc, elemento) => {
      return acc + Number(elemento.monto);
    }, 0);
  
    return sumaGananciasPorMes;
}

const obtenerGastosPorMes = (indiceMes) => {
    const operacionesPorMes = separarOperacionesPorMes();
    const operacionesMesElegido = operacionesPorMes[indiceMes];
  
    let sumaGastosPorMes = 0;
  
    const gastosPorMes = operacionesMesElegido.filter((elemento) => {
        return elemento.tipo === "gasto";
      }
    );
  
    sumaGastosPorMes = gastosPorMes.reduce((acc, elemento) => {
      return acc + Number(elemento.monto);
    }, 0);
  
    return sumaGastosPorMes;
};

const obtenerBalancePorMes = (indiceMes) => {
    const operacionesPorMes = separarOperacionesPorMes();
    const operacionesMesElegido = operacionesPorMes[indiceMes];

    // No necesitan el reduce aqui
    const totalesPorMes = operacionesMesElegido.reduce((acc, elemento) => {
        const gananciasPorMes = obtenerGananciasPorMes(indiceMes);
        const gastosPorMes = obtenerGastosPorMes(indiceMes);

        return gananciasPorMes - gastosPorMes;
    }, 0)

    return totalesPorMes;
}

const agregarTotalesPorMes = () => {
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const totalesPorMes = meses.reduce((acc, elemento, index) => {
        return acc + `
        <div class="column columns my-0 py-0">
            <h4 class="column has-text-weight-semibold">${elemento}/2021</h4>
            <div class="column has-text-right">
             <h4 class="has-text-success">+$${obtenerGananciasPorMes(index)}</h4>
            </div>
            <div class="column has-text-right">
                <h4 class="has-text-danger">-$${obtenerGastosPorMes(index)}</h4>
            </div>
            <div class="column has-text-right">
                <h4>$${obtenerBalancePorMes(index)}</h4>
            </div>
        </div>
        `
    }, "")

    return totalesPorMes;
}
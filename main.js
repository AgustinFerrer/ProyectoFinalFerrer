
const COSTO_POR_NOCHE = [
    { categoria: "doble  plus con vista", precio: 75000, pasajeros: 2, vista: "si", hidromasaje: "si", img: "./img/doble-indoor.jpg" },
    { categoria: "doble  estandar con vista", precio: 60000, pasajeros: 2, vista: "si", hidromasaje: "no", img: "./img/doble-indoor.jpg" },
    { categoria: "doble superior con vista", precio: 81000, pasajeros: 2, vista: "si", hidromasaje: "si", img: "./img/doble-superior-con-vista.jpg" },
    { categoria: "duplex - dos ambientes plus con vista", precio: 117000, pasajeros: 4, vista: "si", hidromasaje: "si", img: "./img/duplex-dos-ambientes-plus-con-vista.jpg" },
    { categoria: "duplex - dos ambientes con vista", precio: 111000, pasajeros: 4, vista: "si", hidromasaje: "no", img: "./img/doble-indoor.jpg" },
    { categoria: "doble estandar sin vista", precio: 54000, pasajeros: 2, vista: "no", hidromasaje: "no", img: "./img/doble-indoor.jpg" },
    { categoria: "doble indoor", precio: 45000, pasajeros: 2, vista: "no", hidromasaje: "no", img: "./img/doble-indoor.jpg" },
    { categoria: "triple plus con vista", precio: 105000, pasajeros: 3, vista: "si", hidromasaje: "si", img: "./img/doble-indoor.jpg" },
];

const habitacionesContainer = document.getElementById("habitacionesContainer");
const contenedorReserva = document.createElement('div');
contenedorReserva.id = "reservaContainer";
document.body.appendChild(contenedorReserva);

// Función para crear tarjetas de habitaciones
function crearTarjetas(habitaciones) {
    for (const habitacionInfo of habitaciones) {
        const habitacionCard = document.createElement("div");
        habitacionCard.classList.add("card");

        habitacionCard.innerHTML = `
            <img src="${habitacionInfo.img}" class="card-img-top">
            <div class="card-body">
                <h2 class="card-title">${habitacionInfo.categoria}</h2>
                <b class="card-text">$ ${habitacionInfo.precio}</b>
                <p class="card-text">Pax: ${habitacionInfo.pasajeros}</p>
                <p class="card-text">Vista: ${habitacionInfo.vista}</p>
                <p class="card-text">Hidromasaje: ${habitacionInfo.hidromasaje}</p>
                <a href="#" class="btn btn-primary reservar-btn">RESERVAR</a>
            </div>
        `;

        habitacionesContainer.appendChild(habitacionCard);
    }

    // Event Listener para el botón "RESERVAR"
    const botonesReservar = document.querySelectorAll(".reservar-btn");
    botonesReservar.forEach((boton) => {
        boton.addEventListener("click", () => {
            // Obtener la categoría de la habitación seleccionada
            const seleccionCategoria = boton.parentElement.querySelector(".card-title").textContent;
            // Ocultar las tarjetas de habitaciones
            habitacionesContainer.style.display = "none";

            // Crear el formulario
            const formularioSection = document.createElement("section");
            formularioSection.classList.add("formulario");
            formularioSection.innerHTML = `
                <h2>DATOS RESERVA</h2>
                <div>
                    <form>
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" aria-describedby="nombreHelp">
                            <div id="nombreHelp" class="form-text"></div>
                        </div>
                        <div class="mb-3">
                            <label for="apellido" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellidoHelp">
                            <div id="apellidoHelp" class="form-text"></div>
                        </div>
                        <div class="mb-3">
                            <label for="documento" class="form-label">Documento</label>
                            <input type="number" class="form-control" id="documento" aria-describedby="documentoHelp">
                            <div id="documentoHelp" class="form-text"></div>
                        </div>
                        <div class="mb-3">
                            <label for="ingreso" class="form-label">Ingreso</label>
                            <input type="date" class="form-control" id="ingreso" aria-describedby="ingresoHelp">
                            <div id="ingresoHelp" class="form-text"></div>
                        </div>
                        <div class="mb-3">
                            <label for="egreso" class="form-label">Egreso</label>
                            <input type="date" class="form-control" id="egreso" aria-describedby="egresoHelp">
                            <div id="egresoHelp" class="form-text"></div>
                        </div>
                        <div class="mb-3">
                            <label for="pasajeros" class="form-label">Pasajeros</label>
                            <input type="number" class="form-control" id="pasajeros" aria-describedby="pasajerosHelp">
                            <div id="pasajerosHelp" class="form-text"></div>
                        </div>
                        <div class="mb-3">
                            <label for="telefono" class="form-label">Telefono</label>
                            <input type="number" class="form-control" id="telefono" aria-describedby="telefonoHelp">
                            <div id="telefonoHelp" class="form-text"></div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                            <div id="emailHelp" class="form-text"></div>
                        </div>            
                        <button type="button" class="btn btn-primary" id="confirmarReserva">Confirmar Reserva</button>
                    </form>
                </div>
            `;

            // Agregar el formulario al contenedor principal
            contenedorReserva.appendChild(formularioSection);

            // Agregar evento de clic al botón "Confirmar Reserva"
            document.getElementById("confirmarReserva").addEventListener("click", (event) => {
                event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

                // Obtener los datos del formulario
                const ingreso = document.getElementById("ingreso").value;
                const egreso = document.getElementById("egreso").value;
                const pasajeros = document.getElementById("pasajeros").value;
                

                // Lógica de cálculo de tarifas
                let seleccionCategoria = document.querySelector(".card-title").textContent;
                let cantidadPax = parseInt(pasajeros);
                let fechaCheckIn = new Date(ingreso);
                let fechaCheckOut = new Date(egreso);

                // Realizar la reserva utilizando los datos del formulario
                let detalleReserva = calcularCostoTotal(seleccionCategoria, cantidadPax, fechaCheckIn, fechaCheckOut);

                if (detalleReserva !== undefined) {
                    // Mostrar detalles de la reserva
                    mostrarDetallesReserva(detalleReserva);

                    // Ocultar el formulario
                    formularioSection.style.display = "none";
                }
            });

        });
    });
}
// Función para calcular el costo total de la estancia
function calcularCostoTotal(categoria, cantidadPax, fechaCheckIn, fechaCheckOut) {
    // Calcular la cantidad de noches
    const tiempoMilisegundosPorDia = 24 * 60 * 60 * 1000; // 1 día en milisegundos
    const cantidadNoches = Math.round((fechaCheckOut - fechaCheckIn) / tiempoMilisegundosPorDia);

    // Buscar la habitación en el array de precios
    const habitacion = COSTO_POR_NOCHE.find(h => h.categoria === categoria);

    if (habitacion) {
        // Calcular el costo total
        const costoTotal = cantidadNoches * habitacion.precio;

        // Calcular la seña (30% del total)
        const costoSeña = 0.3 * costoTotal;

        // Crear y retornar el objeto con los detalles de la reserva
        return {
            categoria,
            cantidadPax,
            fechaCheckIn: fechaCheckIn.toLocaleDateString(),
            fechaCheckOut: fechaCheckOut.toLocaleDateString(),
            cantidadDeNoches: cantidadNoches,
            costoPorNoche: habitacion.precio,
            costoTotal,
            costoSeña
        };
    } else {
        console.error("La categoría de habitación no se encontró en la lista de precios.");
        return undefined;
    }
}

// Función para aplicar filtros
function aplicarFiltros() {
    const paxFiltro = document.getElementById("pax").value;
    const jacuzziFiltro = document.getElementById("jacuzzi").value;
    const precioOrdenFiltro = document.getElementById("precioOrden").value;
    const vistaFiltro = document.getElementById("vista").value;

    // Filtrar habitaciones según los criterios seleccionados
    const habitacionesFiltradas = COSTO_POR_NOCHE.filter(habitacion => {
        return (paxFiltro === "todos" || habitacion.pasajeros === parseInt(paxFiltro)) &&
            (jacuzziFiltro === "todos" || habitacion.hidromasaje === jacuzziFiltro) &&
            (vistaFiltro === "todos" || habitacion.vista === vistaFiltro);
    });

    // Ordenar habitaciones por precio si es necesario
    if (precioOrdenFiltro === "asc") {
        habitacionesFiltradas.sort((a, b) => a.precio - b.precio);
    } else if (precioOrdenFiltro === "desc") {
        habitacionesFiltradas.sort((a, b) => b.precio - a.precio);
    }

    // Limpiar el contenedor antes de agregar las nuevas tarjetas
    habitacionesContainer.innerHTML = "";

    // Crear y agregar las nuevas tarjetas al contenedor
    crearTarjetas(habitacionesFiltradas);
}

// ... (código existente)

// Función para mostrar detalles de la reserva
function mostrarDetallesReserva(detalleReserva) {
    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const documento = document.getElementById("documento").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;

    // Ocultar el formulario
    const formulario = document.querySelector(".formulario");
    formulario.style.display = "none";

    // Excluir campos del formulario que no deben mostrarse en el detalle
    const camposExcluidos = ["nombre", "apellido", "documento", "telefono", "email"];

    // Crear el div con los detalles de la reserva
    const detallesReservaDiv = document.createElement("div");
    detallesReservaDiv.id = "reservaDetalles"; // Asignar un ID único
    detallesReservaDiv.innerHTML = `
        <h2>DETALLES DE LA RESERVA</h2>
        <h3>DATOS DEL HUÉSPED</h3>
        <p>Nombre: ${nombre}</p>
        <p>Apellido: ${apellido}</p>
        <p>Documento: ${documento}</p>
        <p>Teléfono: ${telefono}</p>
        <p>Email: ${email}</p>
        <h4>COSTOS DE LA HABITACIÓN</h4>
        <h5>${detalleReserva.categoria}</h5>
        <p>IN: ${detalleReserva.fechaCheckIn}</p>
        <p>OUT: ${detalleReserva.fechaCheckOut}</p>
        <p>Pax: ${detalleReserva.cantidadPax}</p>
        <p>Costo por Noche: $${detalleReserva.costoPorNoche}</p>
        <p>Cantidad de Noches: ${detalleReserva.cantidadDeNoches}</p>
        <p>Costo Total: $${detalleReserva.costoTotal}</p>
        <p>Costo Seña (30%): $${detalleReserva.costoSeña}</p>
    `;
    contenedorReserva.appendChild(detallesReservaDiv);

    // Mostrar el div con la consulta para reservar otra habitación
    const confirmarReservaDiv = document.createElement("div");
    confirmarReservaDiv.id = "confirmarReservaDiv"; // Asignar un ID único
    confirmarReservaDiv.innerHTML = `
        <p>¿Desea reservar otra habitación?</p>
        <button onclick="reservarOtra()">Sí</button>
        <button onclick="ocultarConsultaReserva()">No</button>
    `;
    contenedorReserva.appendChild(confirmarReservaDiv);

    // Función para ocultar la consulta de reserva y mostrar las tarjetas nuevamente
    window.ocultarConsultaReserva = function () {
        // Ocultar el div con la consulta para reservar otra habitación
        confirmarReservaDiv.style.display = "none";

        // Mostrar las tarjetas de habitaciones nuevamente
        habitacionesContainer.style.removeProperty("display");

        // Ocultar el detalle de la reserva
        detallesReservaDiv.style.display = "none";
    };

    // Función para reservar otra habitación
    window.reservarOtra = function () {
        // Ocultar el div con la consulta para reservar otra habitación
        confirmarReservaDiv.style.display = "none";

        // Limpiar el detalle de la reserva almacenado
        contenedorReserva.detalleReserva = undefined;

        // Mostrar las tarjetas de habitaciones nuevamente
        habitacionesContainer.style.removeProperty("display");

        // Ocultar el detalle de la reserva
        detallesReservaDiv.style.display = "none";
    };
}


// Crear las tarjetas al cargar la página
crearTarjetas(COSTO_POR_NOCHE);


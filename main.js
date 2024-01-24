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
const contenedorReserva = document.getElementById("reservaContainer");

// Arreglo para almacenar reservas
const reservas = [];

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
                <a href="#" class="btn btn-primary reservar-btn" data-categoria="${habitacionInfo.categoria}">RESERVAR</a>
            </div>
        `;

        habitacionesContainer.appendChild(habitacionCard);
    }g

    // Event Listener para el botón "RESERVAR"
    const botonesReservar = document.querySelectorAll(".reservar-btn");
    botonesReservar.forEach((boton) => {
        boton.addEventListener("click", () => {
            // Obtener la categoría de la habitación seleccionada
            const seleccionCategoria = boton.dataset.categoria;

            // Guardar la habitación seleccionada en localStorage
            localStorage.setItem("habitacionSeleccionada", seleccionCategoria);

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

                // Recuperar la reserva almacenada en localStorage al cargar la página
                const reservaGuardada = localStorage.getItem("reserva");
                if (reservaGuardada) {
                    const reserva = JSON.parse(reservaGuardada);
                    document.getElementById("nombre").value = reserva.nombre;
                    document.getElementById("apellido").value = reserva.apellido;
                    document.getElementById("documento").value = reserva.documento;
                    document.getElementById("ingreso").value = reserva.fechaCheckIn;
                    document.getElementById("egreso").value = reserva.fechaCheckOut;
                    document.getElementById("pasajeros").value = reserva.cantidadPax;
                    document.getElementById("telefono").value = reserva.telefono;
                    document.getElementById("email").value = reserva.email;
                }

                // Lógica de cálculo de tarifas
                let cantidadPax = parseInt(pasajeros);
                let fechaCheckIn = new Date(ingreso);
                let fechaCheckOut = new Date(egreso);

                // Realizar la reserva utilizando los datos del formulario
                let detalleReserva = calcularCostoTotal(seleccionCategoria, cantidadPax, fechaCheckIn, fechaCheckOut);

                if (detalleReserva !== undefined) {
                    // Agregar datos del huésped a la reserva
                    detalleReserva.nombre = nombre;
                    detalleReserva.apellido = apellido;
                    detalleReserva.documento = documento;
                    detalleReserva.telefono = telefono;
                    detalleReserva.email = email;

                    // Agregar la reserva al arreglo
                    reservas.push(detalleReserva);

                    // Mostrar detalles de la reserva
                    mostrarDetallesReserva(detalleReserva);

                    // Ocultar el formulario
                    formularioSection.style.display = "none";

                    // Mostrar el div de todas las reservas
                    mostrarTodasLasReservas();
                }
            });
        });
    });
}

// Función para mostrar detalles de la reserva
function mostrarDetallesReserva(detalleReserva) {
    // Excluir campos del formulario que no deben mostrarse en el detalle
    const camposExcluidos = ["nombre", "apellido", "documento", "telefono", "email"];

    // Crear el div con los detalles de la reserva
    const detallesReservaDiv = document.createElement("div");
    detallesReservaDiv.id = "reservaDetalles"; // Asignar un ID único
    detallesReservaDiv.innerHTML = `
        <h2>DETALLES DE LA RESERVA</h2>
        <h3>DATOS DEL HUÉSPED</h3>
        <p>Nombre: ${detalleReserva.nombre}</p>
        <p>Apellido: ${detalleReserva.apellido}</p>
        <p>Documento: ${detalleReserva.documento}</p>
        <p>Teléfono: ${detalleReserva.telefono}</p>
        <p>Email: ${detalleReserva.email}</p>
        <h3>DATOS DE LA RESERVA</h3>
        <p>Categoría: ${detalleReserva.categoria}</p>
        <p>Check-In: ${detalleReserva.fechaCheckIn}</p>
        <p>Check-Out: ${detalleReserva.fechaCheckOut}</p>
        <p>Pax: ${detalleReserva.cantidadPax}</p>
        <p>Costo Total: $${detalleReserva.costoTotal}</p>
        <button type="button" class="btn btn-primary" id="reservarOtra">Reservar Otra Habitación</button>
    `;

    // Agregar el div al contenedor principal
    contenedorReserva.appendChild(detallesReservaDiv);

    // Agregar evento de clic al botón "Reservar Otra Habitación"
    document.getElementById("reservarOtra").addEventListener("click", () => {
        // Limpiar el contenedor de reservas
        contenedorReserva.innerHTML = "";
        // Mostrar las tarjetas de habitaciones
        habitacionesContainer.style.display = "grid";
    });
}

// Función para mostrar detalles de todas las reservas
function mostrarTodasLasReservas() {
    // Crear el div para mostrar todas las reservas
    const todasLasReservasDiv = document.createElement("div");
    todasLasReservasDiv.id = "todasLasReservas"; // Asignar un ID único
    todasLasReservasDiv.innerHTML = `
        <h2>TODAS LAS RESERVAS</h2>
    `;

    // Iterar sobre las reservas y agregar detalles al div
    reservas.forEach((reserva, index) => {
        todasLasReservasDiv.innerHTML += `
            <div class="reservaIndividual">
                <h3>Reserva ${index + 1}</h3>
                <p>Categoría: ${reserva.categoria}</p>
                <p>Check-In: ${reserva.fechaCheckIn}</p>
                <p>Check-Out: ${reserva.fechaCheckOut}</p>
                <p>Pax: ${reserva.cantidadPax}</p>
                <p>Costo Total: $${reserva.costoTotal}</p>
            </div>
        `;
    });

    // Agregar el div al contenedor principal
    contenedorReserva.appendChild(todasLasReservasDiv);

    // Ocultar el div de todas las reservas
    document.getElementById("todasLasReservas").style.display = "none";
}

// Función para calcular el costo total de la reserva
function calcularCostoTotal(categoria, cantidadPax, fechaCheckIn, fechaCheckOut) {
    // Buscar la habitación según la categoría seleccionada
    const habitacionSeleccionada = COSTO_POR_NOCHE.find((habitacion) => habitacion.categoria === categoria);

    if (habitacionSeleccionada) {
        // Calcular la cantidad de noches
        const tiempoResidencia = fechaCheckOut - fechaCheckIn;
        const cantidadNoches = tiempoResidencia / (1000 * 60 * 60 * 24);

        // Calcular el costo total
        const costoTotal = habitacionSeleccionada.precio * cantidadNoches;

        // Devolver los detalles de la reserva
        return {
            categoria,
            cantidadPax,
            fechaCheckIn: fechaCheckIn.toLocaleDateString(),
            fechaCheckOut: fechaCheckOut.toLocaleDateString(),
            costoTotal,
        };
    } else {
        // En caso de no encontrar la habitación
        alert("Error al seleccionar la habitación");
        return undefined;
    }
}

// Llamar a la función para crear las tarjetas de habitaciones
crearTarjetas(COSTO_POR_NOCHE);

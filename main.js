// Función para cargar el archivo JSON desde el almacenamiento local del navegador
async function cargarHabitacionesDesdeLocalStorage() {
    try {
        const habitacionesJSON = localStorage.getItem('habitaciones');
        return habitacionesJSON ? JSON.parse(habitacionesJSON) : (console.log('No se encontraron habitaciones en el almacenamiento local.'), []);
    } catch (error) {
        console.error('Error al cargar las habitaciones desde el almacenamiento local', error);
        return [];
    }
}

// Función para cargar las habitaciones desde JSON, utilizando almacenamiento local como caché si está disponible
async function cargarHabitaciones() {
    try {
        let habitaciones = await cargarHabitacionesDesdeLocalStorage();
        habitaciones = habitaciones.length === 0 ? await obtenerHabitacionesDesdeJSON() : habitaciones;
        return habitaciones;
    } catch (error) {
        console.error('Error al cargar las habitaciones', error);
        return [];
    }
}

async function obtenerHabitacionesDesdeJSON() {
    try {
        const response = await fetch('habitaciones.json');
        const habitaciones = await response.json();
        localStorage.setItem('habitaciones', JSON.stringify(habitaciones));
        return habitaciones;
    } catch (error) {
        console.error('Error al cargar las habitaciones desde el archivo JSON', error);
        return [];
    }
}


// Función para crear las tarjetas de habitaciones
function crearTarjetas(habitaciones) {
    const habitacionesContainer = document.getElementById("habitacionesContainer");
    habitaciones.forEach(habitacionInfo => {
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
    });

    // Event Listener para el botón "RESERVAR"
    habitacionesContainer.addEventListener("click", async (event) => {
        if (event.target.classList.contains("reservar-btn")) {
            const boton = event.target;
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
                    </form>
                </div>
            `;

            // Agregar el formulario al contenedor principal
            document.body.appendChild(formularioSection);

            // Agregar evento de clic al botón "Confirmar Reserva"
            document.getElementById("confirmarReserva").addEventListener("click", async (event) => {
                event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

                // Obtener los datos del formulario
                const ingreso = document.getElementById("ingreso").value;
                const egreso = document.getElementById("egreso").value;
                const pasajeros = document.getElementById("pasajeros").value;

                // Lógica de cálculo de tarifas
                let seleccionCategoria = boton.parentElement.querySelector(".card-title").textContent;
                let cantidadPax = parseInt(pasajeros);
                let fechaCheckIn = new Date(ingreso);
                let fechaCheckOut = new Date(egreso);

                // Realizar la reserva utilizando los datos del formulario
                let detalleReserva = await calcularCostoTotal(seleccionCategoria, cantidadPax, fechaCheckIn, fechaCheckOut);

                // Mostrar detalles de la reserva si se obtuvieron correctamente
                if (detalleReserva) {
                    mostrarDetallesReserva(detalleReserva);
                    // Ocultar el formulario
                    formularioSection.style.display = "none";
                } else {
                    console.error("No se pudieron obtener los detalles de la reserva.");
                }
            });
        }
    });
}


// Función para calcular el costo total de la estadia
async function calcularCostoTotal(categoria, cantidadPax, fechaCheckIn, fechaCheckOut) {
    try {
        // Cargar los datos de las habitaciones desde el archivo JSON o desde el almacenamiento local
        const habitaciones = await cargarHabitaciones();

        // Calcular la cantidad de noches
        const tiempoMilisegundosPorDia = 24 * 60 * 60 * 1000; // 1 día en milisegundos
        const cantidadNoches = Math.round((fechaCheckOut - fechaCheckIn) / tiempoMilisegundosPorDia);

        // Buscar la habitación en el array de precios
        const habitacion = habitaciones.find(h => h.categoria === categoria);

        if (!habitacion) {
            console.error("La categoría de habitación no se encontró en la lista de precios.");
            return undefined;
        }

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
    } catch (error) {
        console.error('Error al calcular el costo total de la estancia', error);
        return undefined;
    }
}


// Función para aplicar filtros
async function aplicarFiltros() {
    try {
        // Obtener los datos de las habitaciones desde el archivo JSON o desde el almacenamiento local
        const habitaciones = await cargarHabitaciones();

        const paxFiltro = document.getElementById("pax").value;
        const jacuzziFiltro = document.getElementById("jacuzzi").value;
        const precioOrdenFiltro = document.getElementById("precioOrden").value;
        const vistaFiltro = document.getElementById("vista").value;

        // Filtrar habitaciones según los criterios seleccionados
        const habitacionesFiltradas = habitaciones.filter(habitacion => (
            (paxFiltro === "todos" || habitacion.pasajeros === parseInt(paxFiltro)) &&
            (jacuzziFiltro === "todos" || habitacion.hidromasaje === jacuzziFiltro) &&
            (vistaFiltro === "todos" || habitacion.vista === vistaFiltro)
        ));

        // Ordenar habitaciones por precio si es necesario
        if (precioOrdenFiltro === "asc") {
            habitacionesFiltradas.sort((a, b) => a.precio - b.precio);
        } else if (precioOrdenFiltro === "desc") {
            habitacionesFiltradas.sort((a, b) => b.precio - a.precio);
        }

        // Limpiar el contenedor antes de agregar las nuevas tarjetas
        const habitacionesContainer = document.getElementById("habitacionesContainer");
        habitacionesContainer.innerHTML = "";

        // Crear y agregar las nuevas tarjetas al contenedor
        crearTarjetas(habitacionesFiltradas);
    } catch (error) {
        console.error('Error al aplicar filtros', error);
    }
}


// Agregar event listeners a los campos de filtro para capturar los cambios
document.getElementById("pax").addEventListener("change", aplicarFiltros);
document.getElementById("jacuzzi").addEventListener("change", aplicarFiltros);
document.getElementById("precioOrden").addEventListener("change", aplicarFiltros);
document.getElementById("vista").addEventListener("change", aplicarFiltros);

// Función para mostrar detalles de la reserva
function mostrarDetallesReserva(detalleReserva) {
    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const documento = document.getElementById("documento").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;

    // Crear el mensaje de la alerta con los detalles de la reserva
    const mensajeAlerta = `
        DATOS DEL HUÉSPED:
        - Nombre: ${nombre}
        - Apellido: ${apellido}
        - Documento: ${documento}
        - Teléfono: ${telefono}
        - Email: ${email}
        
        COSTOS DE LA HABITACIÓN:
        - Categoría: ${detalleReserva.categoria}
        - Check-In: ${detalleReserva.fechaCheckIn}
        - Check-Out: ${detalleReserva.fechaCheckOut}
        - Pasajeros: ${detalleReserva.cantidadPax}
        - Costo por Noche: $${detalleReserva.costoPorNoche}
        - Cantidad de Noches: ${detalleReserva.cantidadDeNoches}
        - Costo Total: $${detalleReserva.costoTotal}
        - Costo Seña (30%): $${detalleReserva.costoSeña}
    `;

    // Mostrar la alerta con Sweet Alert
    swal("Detalles de la reserva", mensajeAlerta, "success");
}


// Función para inicializar la aplicación
async function iniciarApp() {
    const habitaciones = await cargarHabitaciones();
    crearTarjetas(habitaciones);
}

// Llamar a la función para iniciar la aplicación
iniciarApp();

const COSTO_POR_NOCHE = {
    "doble  plus con vista": { precio: 75000, pasajeros: 2 },
    "doble  estandar con vista": { precio: 60000, pasajeros: 2 },
    "doble superior con vista": { precio: 81000, pasajeros: 2 },
    "duplex - dos ambientes plus con vista": { precio: 117000, pasajeros: 4 },
    "duplex - dos ambientes con vista": { precio: 111000, pasajeros: 4 },
    "doble estandar sin vista": { precio: 54000, pasajeros: 2 },
    "doble indoor": { precio: 45000, pasajeros: 2 },
    "triple plus con vista": { precio: 105000, pasajeros: 3 },
};

function obtenerFecha(promptText) {
    let fecha;
    while (true) {
        let input = prompt(promptText);
        let [dia, mes, anio] = input.split("/");

        fecha = new Date(`${mes}/${dia}/${anio}`);

        if (!isNaN(fecha.getTime()) && fecha.getFullYear() == anio && fecha.getMonth() + 1 == mes && fecha.getDate() == dia) {
            break;
        } else {
            alert("Fecha inválida. Por favor, ingrese una fecha válida (DD/MM/YYYY).");
        }
    }

    return formatearFecha(fecha);
}

function formatearFecha(fecha) {
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}

function calcularDiferenciaEnDias(fechaInicio, fechaFin) {
    const unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
    const inicioSinHora = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate());
    const finSinHora = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate());
    const diferenciaEnMilisegundos = finSinHora.getTime() - inicioSinHora.getTime();
    return Math.ceil(diferenciaEnMilisegundos / unDiaEnMilisegundos);
}

function calcularCostoTotal(categoria, cantidadPax, fechaCheckIn, fechaCheckOut) {
    let costoPorNoche = COSTO_POR_NOCHE[categoria].precio;
    if (!costoPorNoche) {
        alert("CATEGORÍA INCORRECTA!!!");
        return;
    }

    let cantidadDeNoches = calcularDiferenciaEnDias(new Date(formatearFecha(fechaCheckIn)), new Date(formatearFecha(fechaCheckOut)));

    let costoTotal = cantidadDeNoches * costoPorNoche;
    let costoSeña = 0.3 * costoTotal;

    return {
        categoria: categoria,
        cantidadPax: cantidadPax,
        fechaCheckIn: formatearFecha(fechaCheckIn),
        fechaCheckOut: formatearFecha(fechaCheckOut),
        cantidadDeNoches: cantidadDeNoches,
        costoPorNoche: costoPorNoche,
        costoTotal: costoTotal,
        costoSeña: costoSeña,
        nombreHabitacion: categoria
    };
}

let presupuestoTotal = 0;
let detallesReserva = [];

const contenedorReserva = document.createElement('div');
document.body.appendChild(contenedorReserva);

let filtroOrden = prompt("¿Desea filtrar por cantidad de pasajeros (1), ordenar por valor de las habitaciones (2) o ninguno (presiona Enter)?");

while (true) {
    if (filtroOrden === "1") {
        let cantidadPax = parseInt(prompt("Ingrese la cantidad de pasajeros:"));
        let opcionesDisponibles = Object.keys(COSTO_POR_NOCHE).filter(categoria => COSTO_POR_NOCHE[categoria].pasajeros >= cantidadPax);

        if (opcionesDisponibles.length === 0) {
            alert("No hay opciones disponibles para la cantidad de pasajeros ingresada.");
        }

        let opciones = opcionesDisponibles.map(opcion => `◉ ${opcion}`).join('\n');
        let seleccionCategoria = prompt(`Opciones disponibles para ${cantidadPax} pasajeros:\n${opciones}`).toLowerCase();

        if (COSTO_POR_NOCHE.hasOwnProperty(seleccionCategoria)) {
            let fechaCheckIn = obtenerFecha("Ingrese la fecha de ingreso (DD/MM/YYYY):");
            let fechaCheckOut = obtenerFecha("Ingrese la fecha de egreso (DD/MM/YYYY):");

            let detalleReserva = calcularCostoTotal(seleccionCategoria, cantidadPax, new Date(fechaCheckIn), new Date(fechaCheckOut));

            if (detalleReserva !== undefined) {
                contenedorReserva.innerHTML += `<p>Seleccionaste ${seleccionCategoria}</p>
                                                <p>Nombre de habitación: ${detalleReserva.nombreHabitacion}</p>
                                                <p>Cantidad de Pax: ${detalleReserva.cantidadPax}</p>
                                                <p>Fecha de ingreso: ${detalleReserva.fechaCheckIn.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}</p>
                                                <p>Fecha de egreso: ${detalleReserva.fechaCheckOut.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}</p>
                                                <p>Cantidad de noches: ${detalleReserva.cantidadDeNoches}</p>
                                                <p>Costo por noche: ${detalleReserva.costoPorNoche}</p>
                                                <p>Costo total de la estadía: ${detalleReserva.costoTotal}</p>
                                                <p>Costo de la seña: ${detalleReserva.costoSeña}</p>`;

                detallesReserva.push(detalleReserva);
                presupuestoTotal += detalleReserva.costoTotal;
            }
        } else {
            alert("CATEGORÍA INCORRECTA!!!");
        }
    } else if (filtroOrden === "2") {
        let tipoOrden = prompt("¿Desea ordenar de menor a mayor (1) o de mayor a menor (2)?");

        let opcionesOrdenadas = Object.entries(COSTO_POR_NOCHE).sort((a, b) => {
            let orden = tipoOrden === "1" ? 1 : -1;
            return orden * (a[1].precio - b[1].precio);
        });

        let opciones = opcionesOrdenadas.map(opcion => `◉ ${opcion[0]}`).join('\n');
        let seleccionCategoria = prompt(`Opciones ordenadas por valor:\n${opciones}`).toLowerCase();

        if (COSTO_POR_NOCHE.hasOwnProperty(seleccionCategoria)) {
            let fechaCheckIn = obtenerFecha("Ingrese la fecha de ingreso (DD/MM/YYYY):");
            let fechaCheckOut = obtenerFecha("Ingrese la fecha de egreso (DD/MM/YYYY):");

            let detalleReserva = calcularCostoTotal(seleccionCategoria, COSTO_POR_NOCHE[seleccionCategoria].pasajeros, new Date(fechaCheckIn), new Date(fechaCheckOut));

            if (detalleReserva !== undefined) {
                contenedorReserva.innerHTML += `<p>Seleccionaste ${seleccionCategoria}</p>
                                                <p>Nombre de habitación: ${detalleReserva.nombreHabitacion}</p>
                                                <p>Cantidad de Pax: ${detalleReserva.cantidadPax}</p>
                                                <p>Fecha de ingreso: ${detalleReserva.fechaCheckIn.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}</p>
                                                <p>Fecha de egreso: ${detalleReserva.fechaCheckOut.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}</p>
                                                <p>Cantidad de noches: ${detalleReserva.cantidadDeNoches}</p>
                                                <p>Costo por noche: ${detalleReserva.costoPorNoche}</p>
                                                <p>Costo total de la estadía: ${detalleReserva.costoTotal}</p>
                                                <p>Costo de la seña: ${detalleReserva.costoSeña}</p>`;

                detallesReserva.push(detalleReserva);
                presupuestoTotal += detalleReserva.costoTotal;
            }
        } else {
            alert("CATEGORÍA INCORRECTA!!!");
        }
    } else {
        let cantidadPax = parseInt(prompt("Ingrese la cantidad de pasajeros:"));
        let opcionesDisponibles = Object.keys(COSTO_POR_NOCHE).filter(categoria => COSTO_POR_NOCHE[categoria].pasajeros >= cantidadPax);

        if (opcionesDisponibles.length === 0) {
            alert("No hay opciones disponibles para la cantidad de pasajeros ingresada.");
            continue;
        }

        let opciones = opcionesDisponibles.map(opcion => `◉ ${opcion}`).join('\n');
        let seleccionCategoria = prompt(`Opciones disponibles para ${cantidadPax} pasajeros:\n${opciones}`).toLowerCase();

        if (COSTO_POR_NOCHE.hasOwnProperty(seleccionCategoria)) {
            let fechaCheckIn = obtenerFecha("Ingrese la fecha de ingreso (DD/MM/YYYY):");
            let fechaCheckOut = obtenerFecha("Ingrese la fecha de egreso (DD/MM/YYYY):");

            let detalleReserva = calcularCostoTotal(seleccionCategoria, cantidadPax, new Date(fechaCheckIn), new Date(fechaCheckOut));

            if (detalleReserva !== undefined) {
                contenedorReserva.innerHTML += `<p>Seleccionaste ${seleccionCategoria}</p>
                                                <p>Nombre de habitación: ${detalleReserva.nombreHabitacion}</p>
                                                <p>Cantidad de Pax: ${detalleReserva.cantidadPax}</p>
                                                <p>Fecha de ingreso: ${detalleReserva.fechaCheckIn.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}</p>
                                                <p>Fecha de egreso: ${detalleReserva.fechaCheckOut.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}</p>
                                                <p>Cantidad de noches: ${detalleReserva.cantidadDeNoches}</p>
                                                <p>Costo por noche: ${detalleReserva.costoPorNoche}</p>
                                                <p>Costo total de la estadía: ${detalleReserva.costoTotal}</p>
                                                <p>Costo de la seña: ${detalleReserva.costoSeña}</p>`;

                detallesReserva.push(detalleReserva);
                presupuestoTotal += detalleReserva.costoTotal;
            }
        } else {
            alert("CATEGORÍA INCORRECTA!!!");
        }
    }

    let respuesta = prompt("¿Desea agregar otra habitación? (si/no)");

    if (respuesta.toLowerCase() !== "si") {
        break;
    }
}


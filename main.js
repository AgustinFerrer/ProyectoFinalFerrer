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

    return {
        categoria: categoria,
        cantidadPax: cantidadPax,
        fechaCheckIn: formatearFecha(fechaCheckIn),
        fechaCheckOut: formatearFecha(fechaCheckOut),
        cantidadDeNoches: cantidadDeNoches,
        costoPorNoche: costoPorNoche,
        costoTotal: costoTotal,
        nombreHabitacion: categoria
    };
}

let presupuestoTotal = 0;
let detallesReserva = [];

while (true) {
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
            alert(`Seleccionaste ${seleccionCategoria}\nNombre de habitación: ${detalleReserva.nombreHabitacion}\nCantidad de Pax: ${detalleReserva.cantidadPax}\nFecha de ingreso: ${detalleReserva.fechaCheckIn}\nFecha de egreso: ${detalleReserva.fechaCheckOut.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}\nCantidad de noches: ${detalleReserva.cantidadDeNoches}\nCosto por noche: ${detalleReserva.costoPorNoche}\nCosto total de la estadía: ${detalleReserva.costoTotal}`);
            
            detallesReserva.push(detalleReserva);
            presupuestoTotal += detalleReserva.costoTotal;
        }
    } else {
        alert("CATEGORÍA INCORRECTA!!!");
    }

    let respuesta = prompt("¿Desea agregar otra habitación? (si/no)");

    if (respuesta.toLowerCase() !== "si") {
        break;
    }
}

let resumen = "Resumen de la reserva:\n\n";
for (let i = 0; i < detallesReserva.length; i++) {
    resumen += `Habitación ${i + 1}:\n`;
    resumen += `Categoría: ${detallesReserva[i].categoria}\n`;
    resumen += `Nombre de habitación: ${detallesReserva[i].nombreHabitacion}\n`;
    resumen += `Cantidad de Pax: ${detallesReserva[i].cantidadPax}\n`;
    resumen += `Fecha de ingreso: ${detallesReserva[i].fechaCheckIn}\n`;
    resumen += `Fecha de egreso: ${detallesReserva[i].fechaCheckOut}\n`;
    resumen += `Cantidad de noches: ${detallesReserva[i].cantidadDeNoches}\n`;
    resumen += `Costo por noche: ${detallesReserva[i].costoPorNoche}\n`;
    resumen += `Costo total: ${detallesReserva[i].costoTotal}\n\n`;
}

resumen += `Presupuesto total de la reserva: ${presupuestoTotal}`;
alert(resumen);

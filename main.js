const COSTO_POR_NOCHE = {
    "suit estandar con hidromasaje": 75000,
    "suit superior con hidromasaje": 85000,
    "duplex con hidromasaje": 140000,
    "suit estandar": 65000,
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

function calcularCostoTotal(categoria, fechaCheckIn, fechaCheckOut) {
    let costoPorNoche = COSTO_POR_NOCHE[categoria];
    if (!costoPorNoche) {
        alert("CATEGORÍA INCORRECTA!!!");
        return;
    }

    let cantidadDeNoches = calcularDiferenciaEnDias(new Date(formatearFecha(fechaCheckIn)), new Date(formatearFecha(fechaCheckOut)));

    let costoTotal = cantidadDeNoches * costoPorNoche;

    return {
        categoria: categoria,
        fechaCheckIn: formatearFecha(fechaCheckIn),
        fechaCheckOut: formatearFecha(fechaCheckOut),
        cantidadDeNoches: cantidadDeNoches,
        costoPorNoche: costoPorNoche,
        costoTotal: costoTotal
    };
}

let presupuestoTotal = 0;
let detallesReserva = [];

while (true) {
    let opciones = "◉ Suit Estandar con Hidromasaje\n◉ Suit Superior con Hidromasaje\n◉ Duplex con Hidromasaje\n◉ Suit Estandar";

    let seleccion = prompt("Ingrese la Categoría de habitación que desea reservar:\n" + opciones).toLowerCase();

    if (COSTO_POR_NOCHE.hasOwnProperty(seleccion)) {
        let fechaCheckIn = obtenerFecha("Ingrese la fecha de ingreso (DD/MM/YYYY):");
        let fechaCheckOut = obtenerFecha("Ingrese la fecha de egreso (DD/MM/YYYY):");

        let detalleReserva = calcularCostoTotal(seleccion, new Date(fechaCheckIn), new Date(fechaCheckOut));

        if (detalleReserva !== undefined) {
            alert(`Seleccionaste ${seleccion}\nFecha de ingreso: ${detalleReserva.fechaCheckIn}\nFecha de egreso: ${detalleReserva.fechaCheckOut.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}\nCantidad de noches: ${detalleReserva.cantidadDeNoches}\nCosto por noche: ${detalleReserva.costoPorNoche}\nCosto total de la estadía: ${detalleReserva.costoTotal}`);
            
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
    resumen += `Fecha de ingreso: ${detallesReserva[i].fechaCheckIn}\n`;
    resumen += `Fecha de egreso: ${detallesReserva[i].fechaCheckOut}\n`;
    resumen += `Cantidad de noches: ${detallesReserva[i].cantidadDeNoches}\n`;
    resumen += `Costo por noche: ${detallesReserva[i].costoPorNoche}\n`;
    resumen += `Costo total: ${detallesReserva[i].costoTotal}\n\n`;
}

resumen += `Presupuesto total de la reserva: ${presupuestoTotal}`;
alert(resumen);



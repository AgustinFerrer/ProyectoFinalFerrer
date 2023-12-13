let opciones = "◉ Suit Estandar con Hidromasaje\n◉ Suit Superior con Hidromasaje\n◉ Duplex con Hidromasaje\n◉ Suit Estandar";

// Se solicita al usuario que ingrese la categoría de habitación que desea reservar
let seleccion = prompt("Ingrese la Categoría de habitación que desea reservar:\n" + opciones).toLowerCase();

function cantidadDeNoches() {
    // Se solicita al usuario que ingrese la fecha de ingreso
    let checkIn = prompt("Ingrese la fecha de ingreso (DD/MM/YYYY):").toLowerCase();
    // Se solicita al usuario que ingrese la fecha de egreso
    let checkOut = prompt("Ingrese la fecha de egreso (DD/MM/YYYY):").toLowerCase();

    // Convertir las cadenas de fecha a objetos Date (considerando formato argentino)
    let [diaIn, mesIn, anioIn] = checkIn.split("/");
    let [diaOut, mesOut, anioOut] = checkOut.split("/");
    
    // Crear objetos Date con las fechas ingresadas
    let fechaCheckIn = new Date(anioIn, mesIn - 1, diaIn); // Meses en JavaScript son de 0 a 11
    let fechaCheckOut = new Date(anioOut, mesOut - 1, diaOut);

    // Calcular la diferencia en milisegundos entre las fechas
    let diferenciaEnMilisegundos = fechaCheckOut - fechaCheckIn;
    // Calcular la diferencia en días redondeando hacia arriba
    let diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    // Calcular el costo por noche según la categoría seleccionada
    let costoPorNoche = 0;

    switch (seleccion) {
        case "suit estandar con hidromasaje":
            costoPorNoche = 75000; // Costo en moneda local (puedes ajustarlo)
            break;
        case "suit superior con hidromasaje":
            costoPorNoche = 85000;
            break;
        case "duplex con hidromasaje":
            costoPorNoche = 140000;
            break;
        case "suit estandar":
            costoPorNoche = 65000;
            break;
        default:
            alert("CATEGORÍA INCORRECTA!!!");
            return; // Salir de la función si la categoría es incorrecta
    }

    // Calcular el costo total de la estadía
    let costoTotal = diferenciaEnDias * costoPorNoche;

    // Mostrar información en formato argentino mediante un cuadro de alerta
    alert(`Seleccionaste ${seleccion}\nFecha de ingreso: ${fechaCheckIn.toLocaleDateString('es-AR')}\nFecha de egreso: ${fechaCheckOut.toLocaleDateString('es-AR')}\nCantidad de noches: ${diferenciaEnDias}\nCosto por noche: ${costoPorNoche}\nCosto total de la estadía: ${costoTotal}`);
} 

// Llamada a la función si la categoría de habitación es válida
if (seleccion === "suit estandar con hidromasaje" ||
    seleccion === "suit superior con hidromasaje" ||
    seleccion === "duplex con hidromasaje" ||
    seleccion === "suit estandar") {
    cantidadDeNoches();
} else {
    alert("CATEGORÍA INCORRECTA!!!");
}



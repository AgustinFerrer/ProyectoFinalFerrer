let opciones = "◉ Suit Estandar con Hidromasaje\n◉ Suit Superior con Hidromasaje\n◉ Duplex con Hidromasaje\n◉ Suit Estandar";

let seleccion = prompt("Ingrese la Categoría de habitación que desea reservar:\n" + opciones);

function cantidadDeNoches() {
    let checkIn = prompt("Ingrese la fecha de ingreso (DD/MM/YYYY):");
    let checkOut = prompt("Ingrese la fecha de egreso (DD/MM/YYYY):");

    // Convertir las cadenas de fecha a objetos Date (considerando formato argentino)
    let [diaIn, mesIn, anioIn] = checkIn.split("/");
    let [diaOut, mesOut, anioOut] = checkOut.split("/");
    
    let fechaCheckIn = new Date(anioIn, mesIn - 1, diaIn); // Meses en JavaScript son de 0 a 11
    let fechaCheckOut = new Date(anioOut, mesOut - 1, diaOut);

    // Calcular la diferencia en días
    let diferenciaEnMilisegundos = fechaCheckOut - fechaCheckIn;
    let diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    // Mostrar información en formato argentino
    alert(`Seleccionaste ${seleccion}\nFecha de ingreso: ${fechaCheckIn.toLocaleDateString('es-AR')}\nFecha de egreso: ${fechaCheckOut.toLocaleDateString('es-AR')}\nCantidad de noches: ${diferenciaEnDias}`);
}

if (seleccion === "Suit Estandar con Hidromasaje" ||
    seleccion === "Suit Superior con Hidromasaje" ||
    seleccion === "Duplex con Hidromasaje" ||
    seleccion === "Suit Estandar") {
    cantidadDeNoches();
} else {
    alert("CATEGORÍA INCORRECTA!!!");
}



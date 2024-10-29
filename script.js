// Función para cargar notas de alumnos
function cargarNotas() {
    let cantidadAlumnos = parseInt(prompt("Ingrese la cantidad de alumnos:"));
    let sumaNotas = 0;

    for (let i = 0; i < cantidadAlumnos; i++) {
        let nota = parseFloat(prompt(`Ingrese la nota del alumno ${i + 1}:`));
        sumaNotas += nota;
    }

    return sumaNotas / cantidadAlumnos;
}

// Función principal
function main() {
    let promedio = cargarNotas();

    if (promedio >= 6) {
        alert(`El promedio de las notas es ${promedio}. ¡Aprobado!`);
    } else {
        alert(`El promedio de las notas es ${promedio}. Desaprobado.`);
    }
}

// Ejecuta la función principal
main();

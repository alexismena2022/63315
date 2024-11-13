document.addEventListener('DOMContentLoaded', () => {
    // Lista de instrumentos musicales
    const instrumentos = [
        { id: 1, nombre: 'Guitarra Eléctrica', precio: 500000 },
        { id: 2, nombre: 'Bajo Electrico', precio: 45000 },
        { id: 3, nombre: 'Batería', precio: 70000 }
    ];

    // Funcionalidad básica de carrito de compras
    const carrito = [];

    function agregarAlCarrito(id) {
        const instrumento = instrumentos.find(instr => instr.id === id);
        if (instrumento) {
            carrito.push(instrumento);
            console.log(`Agregado al carrito: ${instrumento.nombre}`);
        } else {
            console.log('Instrumento no encontrado');
        }
    }

    function eliminarDelCarrito(id) {
        const indice = carrito.findIndex(instr => instr.id === id);
        if (indice !== -1) {
            const instrumentoEliminado = carrito.splice(indice, 1);
            console.log(`Eliminado del carrito: ${instrumentoEliminado[0].nombre}`);
        } else {
            console.log('Instrumento no encontrado en el carrito');
        }
    }

    function mostrarCarrito() {
        console.log('Contenido del carrito:', carrito);
    }

    function calcularTotal() {
        const total = carrito.reduce((sum, instr) => sum + instr.precio, 0);
        console.log(`Total del carrito: $${total}`);
    }

    function finalizarCompra() {
        if (carrito.length > 0) {
            console.log('Compra finalizada. Gracias por su compra.');
            carrito.length = 0; // Vaciar el carrito
        } else {
            console.log('El carrito está vacío.');
        }
    }

    function ordenarCarrito() {
        carrito.sort((a, b) => a.precio - b.precio);
        console.log('Carrito ordenado por precio:', carrito);
    }

    function filtrarInstrumentos(criterio) {
        let resultados;
        if (typeof criterio === 'string') {
            resultados = instrumentos.filter(instr => instr.nombre.toLowerCase().includes(criterio.toLowerCase()));
        } else if (typeof criterio === 'object' && criterio.min !== undefined && criterio.max !== undefined) {
            resultados = instrumentos.filter(instr => instr.precio >= criterio.min && instr.precio <= criterio.max);
        } else {
            resultados = [];
        }
        console.log('Resultados del filtro:', resultados);
        return resultados;
    }

    // Exponer funciones globalmente para uso en la consola
    window.agregarAlCarrito = agregarAlCarrito;
    window.eliminarDelCarrito = eliminarDelCarrito;
    window.mostrarCarrito = mostrarCarrito;
    window.calcularTotal = calcularTotal;
    window.finalizarCompra = finalizarCompra;
    window.ordenarCarrito = ordenarCarrito;
    window.filtrarInstrumentos = filtrarInstrumentos;

    // Ciclo while para mostrar instrumentos en la consola
    let i = 0;
    while (i < instrumentos.length) {
        console.log(`Instrumento: ${instrumentos[i].nombre}, Precio: ${instrumentos[i].precio}`);
        i++;
    }

    // Buscar un instrumento específico usando find
    const instrumentoBuscado = instrumentos.find(instr => instr.nombre === 'Bajo Electrico');
    console.log('Instrumento encontrado:', instrumentoBuscado);

    // Buscar el índice de un instrumento específico usando findIndex
    const indiceInstrumento = instrumentos.findIndex(instr => instr.nombre === 'Batería Acústica');
    console.log('Índice del instrumento encontrado:', indiceInstrumento);

    // Menú para trabajar en consola
    console.log('Menú de opciones:');
    console.log('1. agregarAlCarrito(id) - Agregar un instrumento al carrito');
    console.log('2. eliminarDelCarrito(id) - Eliminar un instrumento del carrito');
    console.log('3. mostrarCarrito() - Mostrar el contenido del carrito');
    console.log('4. calcularTotal() - Calcular el total del carrito');
    console.log('5. finalizarCompra() - Finalizar la compra y vaciar el carrito');
    console.log('6. ordenarCarrito() - Ordenar el carrito por precio');
    console.log('7. filtrarInstrumentos(criterio) - Filtrar instrumentos por nombre o rango de precios');
});
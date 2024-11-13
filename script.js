document.addEventListener('DOMContentLoaded', () => {
    // Agregar contenido dinámico a la sección de guitarras
    const guitarrasSection = document.getElementById('guitarras');
    const guitarrasContent = document.createElement('p');
    guitarrasContent.textContent = 'Nuevas guitarras disponibles en nuestra tienda.';
    guitarrasSection.appendChild(guitarrasContent);

    // Agregar contenido dinámico a la sección de baterías
    const bateriasSection = document.getElementById('baterias');
    const bateriasContent = document.createElement('p');
    bateriasContent.textContent = 'Ofertas especiales en baterías este mes.';
    bateriasSection.appendChild(bateriasContent);

    // Agregar contenido dinámico a la sección de pianos
    const pianosSection = document.getElementById('pianos');
    const pianosContent = document.createElement('p');
    pianosContent.textContent = 'Nuevos modelos de pianos digitales disponibles.';
    pianosSection.appendChild(pianosContent);

    // Lista de instrumentos musicales
    const instrumentos = [
        { id: 1, nombre: 'Guitarra Eléctrica', precio: 500 },
        { id: 2, nombre: 'Batería Acústica', precio: 700 },
        { id: 3, nombre: 'Piano Digital', precio: 1000 },
        { id: 4, nombre: 'Guitarra Acústica', precio: 300 },
        { id: 5, nombre: 'Batería Electrónica', precio: 800 }
    ];

    // Ciclo while para mostrar instrumentos en la consola
    let i = 0;
    while (i < instrumentos.length) {
        console.log(`Instrumento: ${instrumentos[i].nombre}, Precio: ${instrumentos[i].precio}`);
        i++;
    }

    // Buscar un instrumento específico usando find
    const instrumentoBuscado = instrumentos.find(instr => instr.nombre === 'Piano Digital');
    console.log('Instrumento encontrado:', instrumentoBuscado);

    // Buscar el índice de un instrumento específico usando findIndex
    const indiceInstrumento = instrumentos.findIndex(instr => instr.nombre === 'Batería Acústica');
    console.log('Índice del instrumento encontrado:', indiceInstrumento);

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

    // Agregar instrumentos al carrito
    agregarAlCarrito(1); // Agregar Guitarra Eléctrica
    agregarAlCarrito(3); // Agregar Piano Digital

    // Mostrar contenido del carrito
    console.log('Contenido del carrito:', carrito);
});
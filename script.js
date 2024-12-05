document.addEventListener('DOMContentLoaded', () => {

    // Lista de instrumentos musicales
    const instrumentos = [
        { id: 1, nombre: 'Guitarra Gibson', precio: 500000, imagen: 'images/guitarras/gibson.jpg' },
        { id: 2, nombre: 'Guitarra Ibanez Gio', precio: 45000, imagen: 'images/guitarras/ibanez_gio.jpg' },
        { id: 3, nombre: 'Guitarra Jackson', precio: 70000, imagen: 'images/guitarras/jackson.jpg' },
        { id: 4, nombre: 'Batería Musical Premium', precio: 80000, imagen: 'images/baterias/bateria-musical-premium.jpg' },
        { id: 5, nombre: 'Batería Pearl', precio: 90000, imagen: 'images/baterias/pearl.jpg' },
        { id: 6, nombre: 'Batería Yamaha', precio: 100000, imagen: 'images/baterias/yamaha.jpg' },
        { id: 7, nombre: 'Bajo Cort', precio: 110000, imagen: 'images/bajos/cort.jpg' },
        { id: 8, nombre: 'Bajo Fender', precio: 120000, imagen: 'images/bajos/fender.jpg' },
        { id: 9, nombre: 'Bajo Warwick', precio: 130000, imagen: 'images/bajos/warwick.jpg' },
        { id: 10, nombre: 'Guitarra Texas', precio: 60000, imagen: 'images/guitarras/texas.jpg' },
        { id: 11, nombre: 'Guitarra Cort', precio: 55000, imagen: 'images/guitarras/cort.jpg' },
        { id: 12, nombre: 'Guitarra Yakinogua', precio: 65000, imagen: 'images/guitarras/yakinogua.jpg' },
        { id: 13, nombre: 'Batería Tama', precio: 110000, imagen: 'images/baterias/tama.jpg' },
        { id: 14, nombre: 'Batería Truth', precio: 120000, imagen: 'images/baterias/truth.jpg' },
        { id: 15, nombre: 'Batería Sonor', precio: 130000, imagen: 'images/baterias/sonor.jpg' },
        { id: 16, nombre: 'Bajo Vision', precio: 140000, imagen: 'images/bajos/vision.jpg' },
        { id: 17, nombre: 'Bajo Squier', precio: 150000, imagen: 'images/bajos/squier.jpg' },
        { id: 18, nombre: 'Bajo Hidden', precio: 160000, imagen: 'images/bajos/hidden.jpg' }
    ];

    // Funcionalidad de carrito de compras
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function actualizarIconoCarrito() {
        const carritoCount = document.getElementById('carrito-count');
        if (carritoCount) {
            carritoCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        }
    }

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function agregarAlCarrito(id) {
        const instrumento = instrumentos.find(instr => instr.id === id);
        if (instrumento) {
            const itemCarrito = carrito.find(item => item.id === id);
            if (itemCarrito) {
                itemCarrito.cantidad++;
            } else {
                carrito.push({ ...instrumento, cantidad: 1 });
            }
            console.log(`Agregado al carrito: ${instrumento.nombre}`);
            actualizarIconoCarrito();
            guardarCarrito();
        } else {
            console.log('Instrumento no encontrado');
        }
    }

    function eliminarDelCarrito(id) {
        const itemCarrito = carrito.find(item => item.id === id);
        if (itemCarrito) {
            if (itemCarrito.cantidad > 1) {
                itemCarrito.cantidad--;
            } else {
                const indice = carrito.findIndex(item => item.id === id);
                carrito.splice(indice, 1);
            }
            console.log(`Eliminado del carrito: ${itemCarrito.nombre}`);
            actualizarIconoCarrito();
            guardarCarrito();
        } else {
            console.log('Instrumento no encontrado en el carrito');
        }
    }

    function vaciarCarrito() {
        carrito = [];
        console.log('Carrito vaciado');
        actualizarIconoCarrito();
        guardarCarrito();
        mostrarDetallesCarrito();
    }

    function mostrarCarrito() {
        console.log('Contenido del carrito:', carrito);
    }

    function calcularTotal() {
        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        console.log(`Total del carrito: $${total}`);
        return total;
    }

    // function finalizarCompra() {
    //     if (carrito.length > 0) {
    //         alert('Gracias por su compra. Le llegará un correo con los detalles de su compra.');
    //         console.log('Compra finalizada. Gracias por su compra.');
    //         carrito = [];
    //         actualizarIconoCarrito();
    //         guardarCarrito();
    //         mostrarDetallesCarrito();
    //     } else {
    //         alert('El carrito está vacío.');
    //         console.log('El carrito está vacío.');
    //     }
    // }
    function finalizarCompra() {
        if (carrito.length > 0) {
            Swal.fire({
                title: 'Compra finalizada',
                text: 'Gracias por su compra. Le llegará un correo con los detalles de su compra.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                carrito = [];
                actualizarIconoCarrito();
                guardarCarrito();
                mostrarDetallesCarrito();
            });
        } else {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'No hay productos en el carrito.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
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

    function mostrarDetallesCarrito() {
        const carritoItems = document.getElementById('carrito-items');
        const carritoTotal = document.getElementById('carrito-total');
        if (carritoItems && carritoTotal) {
            carritoItems.innerHTML = '';
            carrito.forEach(item => {
                const instr = instrumentos.find(instr => instr.id === item.id);
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrito-item');
                const img = document.createElement('img');
                img.src = instr.imagen;
                img.alt = instr.nombre;
                img.classList.add('carrito-item-img');
                const details = document.createElement('div');
                details.classList.add('carrito-item-details');
                details.textContent = `${instr.nombre} - $${instr.precio} x ${item.cantidad}`;
                const removeButton = document.createElement('button');
                removeButton.textContent = '-';
                removeButton.onclick = () => {
                    eliminarDelCarrito(instr.id);
                    mostrarDetallesCarrito();
                };
                const addButton = document.createElement('button');
                addButton.textContent = '+';
                addButton.onclick = () => {
                    agregarAlCarrito(instr.id);
                    mostrarDetallesCarrito();
                };
                itemDiv.appendChild(img);
                itemDiv.appendChild(details);
                itemDiv.appendChild(removeButton);
                itemDiv.appendChild(addButton);
                carritoItems.appendChild(itemDiv);
            });
            carritoTotal.textContent = calcularTotal();
        }
    }

    function moveCarousel(section, direction) {
        const carousel = document.querySelector(`.carousel .imagenes.${section}`);
        const items = carousel.querySelectorAll('.instrumento');
        const itemWidth = items[0].clientWidth;
        const currentTransform = getComputedStyle(carousel).transform;
        const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
        const currentTranslateX = matrixValues ? parseFloat(matrixValues[1].split(', ')[4]) : 0;
        const newTranslateX = currentTranslateX + direction * itemWidth;
        const maxTranslateX = -(itemWidth * (items.length - 1));
        if (newTranslateX <= 0 && newTranslateX >= maxTranslateX) {
            carousel.style.transform = `translateX(${newTranslateX}px)`;
        }
    }

    function autoMoveCarousel(section) {
        setInterval(() => {
            moveCarousel(section, 1);
        }, 5000);
    }

    // Exponer funciones globalmente para uso en la consola y eventos
    window.agregarAlCarrito = agregarAlCarrito;
    window.eliminarDelCarrito = eliminarDelCarrito;
    window.mostrarCarrito = mostrarCarrito;
    window.calcularTotal = calcularTotal;
    window.finalizarCompra = finalizarCompra;
    window.ordenarCarrito = ordenarCarrito;
    window.filtrarInstrumentos = filtrarInstrumentos;
    window.mostrarDetallesCarrito = mostrarDetallesCarrito;
    window.vaciarCarrito = vaciarCarrito;
    window.moveCarousel = moveCarousel;

    // Ciclo while para mostrar instrumentos en la consola
    let i = 0;
    while (i < instrumentos.length) {
        console.log(`Instrumento: ${instrumentos[i].nombre}, Precio: ${instrumentos[i].precio}`);
        i++;
    }

    // Buscar un instrumento específico usando find
    const instrumentoBuscado = instrumentos.find(instr => instr.nombre === 'Bajo Fender');
    console.log('Instrumento encontrado:', instrumentoBuscado);

    // Buscar el índice de un instrumento específico usando findIndex
    const indiceInstrumento = instrumentos.findIndex(instr => instr.nombre === 'Batería Pearl');
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

    // Mostrar detalles del carrito en la página de carrito
    if (window.location.pathname.endsWith('carrito.html')) {
        mostrarDetallesCarrito();
    }

    // Actualizar el icono del carrito al cargar la página
    actualizarIconoCarrito();

    // Iniciar el movimiento automático del carrusel
    autoMoveCarousel('guitarras');
    autoMoveCarousel('baterias');
    autoMoveCarousel('bajos');
});


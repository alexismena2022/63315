document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('carrito-count').addEventListener('click', function() {
        estilizarElementoConRetardo(this, 'resaltar'); 
    });

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

    // Simulación de un proceso asincrónico con Promise
    function procesarCompra() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const compraExitosa = carrito.length > 0;
                if (compraExitosa) {
                    resolve('Compra procesada con éxito');
                } else {
                    reject('No hay productos en el carrito');
                }
            }, 2000); // Simula un proceso de 2 segundos
        });
    }

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
        if (!carousel) return;

        const items = carousel.querySelectorAll('.instrumento');
        if (items.length === 0) return;

        const itemWidth = items[0].clientWidth;
        const currentTransform = getComputedStyle(carousel).transform;
        const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
        const currentTranslateX = matrixValues ? parseFloat(matrixValues[1].split(', ')[4]) : 0;
        const newTranslateX = currentTranslateX + direction * itemWidth;
        const maxTranslateX = -(itemWidth * (items.length - 1));

        if (newTranslateX <= 0 && newTranslateX >= maxTranslateX) {
            carousel.style.transform = `translateX(${newTranslateX}px)`;
        } else if (newTranslateX > 0) {
            carousel.style.transform = `translateX(0px)`;
        } else if (newTranslateX < maxTranslateX) {
            carousel.style.transform = `translateX(${maxTranslateX}px)`;
        }
    }

    function autoMoveCarousel(section) {
        setInterval(() => {
            moveCarousel(section, 1);
        }, 5000);
    }

    // Cargar datos de instrumentos usando Fetch
    let instrumentos = [];
    fetch('instrumentos.json')
        .then(response => response.json())
        .then(data => {
            instrumentos = data;
            // Inicializar el carrusel y otras funcionalidades después de cargar los datos
            autoMoveCarousel('guitarras');
            autoMoveCarousel('baterias');
            autoMoveCarousel('bajos');
            // Mostrar instrumentos en la consola
            instrumentos.forEach(instr => {
                console.log(`Instrumento: ${instr.nombre}, Precio: ${instr.precio}`);
            });

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

            // Mostrar detalles del carrito en la página de carrito
            if (window.location.pathname.endsWith('carrito.html')) {
                mostrarDetallesCarrito();
            }

            // Actualizar el icono del carrito al cargar la página
            actualizarIconoCarrito();
        })
        .catch(error => console.error('Error al cargar los datos de instrumentos:', error));

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
    window.autoMoveCarousel = autoMoveCarousel;

    // Iniciar el movimiento automático del carrusel
    autoMoveCarousel('guitarras');
    autoMoveCarousel('baterias');
    autoMoveCarousel('bajos');
});

function estilizarElementoConRetardo(elemento, clase) {
    elemento.classList.add(clase); 
    setTimeout(() => {
        elemento.classList.remove(clase); 
    }, 2000);
}
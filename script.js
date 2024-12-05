document.addEventListener('DOMContentLoaded', () => {

    // Lista de instrumentos musicales
    const instrumentos = [
        { id: 1, nombre: 'Guitarra Gibson', precio: 500000, imagen: 'images/guitarras/gibson.jpg' },
        { id: 2, nombre: 'Guitarra Ibanez Gio', precio: 45000, imagen: 'images/guitarras/ibanez_gio.jpg' },
        { id: 3, nombre: 'Guitarra Jackson', precio: 70000, imagen: 'images/guitarras/jackson.jpg' },
        // ...
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

    function esInstrumentoValido(instrumento) {
        return instrumento &&
            typeof instrumento.id === 'number' &&
            typeof instrumento.nombre === 'string' &&
            typeof instrumento.precio === 'number' &&
            typeof instrumento.imagen === 'string';
    }

    function agregarAlCarrito(id) {
        const instrumento = instrumentos.find(instr => instr.id === id);
        if (instrumento && esInstrumentoValido(instrumento)) {
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
            console.error('Instrumento no válido o no encontrado.');
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

    function calcularTotal() {
        return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }

    function finalizarCompra() {
        if (carrito.length > 0) {
            // Mostrar alerta de compra finalizada
            alert('Gracias por su compra. Le llegará un correo con los detalles de su compra.');
    
            // Mantener funcionalidad de toast si deseas usarlo también
            if (typeof toast !== 'undefined' && toast.success) {
                toast.success('Gracias por su compra. Le llegará un correo con los detalles de su compra.');
            }
    
            console.log('Compra finalizada. Gracias por su compra.');
            carrito = [];
            actualizarIconoCarrito();
            guardarCarrito();
            mostrarDetallesCarrito();
        } else {
            // Mostrar alerta si el carrito está vacío
            alert('El carrito está vacío.');
    
            // Mantener funcionalidad de toast para mensajes de error
            if (typeof toast !== 'undefined' && toast.error) {
                toast.error('El carrito está vacío.');
            }
    
            console.log('El carrito está vacío.');
        }
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

    function autoMoveCarousel(section) {
        setInterval(() => {
            const carousel = document.querySelector(`.carousel .imagenes.${section}`);
            if (carousel) moveCarousel(section, 1);
        }, 5000);
    }

    // Exponer funciones globalmente
    window.agregarAlCarrito = agregarAlCarrito;
    window.eliminarDelCarrito = eliminarDelCarrito;
    window.finalizarCompra = finalizarCompra;
    window.vaciarCarrito = vaciarCarrito;

    // Inicialización
    if (window.location.pathname.endsWith('carrito.html')) {
        mostrarDetallesCarrito();
    }
    actualizarIconoCarrito();
    autoMoveCarousel('guitarras');
    autoMoveCarousel('baterias');
    autoMoveCarousel('bajos');
});

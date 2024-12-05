import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>La Casa del Músico</h1>
        <nav>
          <ul>
            <li><a href="#guitarras">Guitarras</a></li>
            <li><a href="#baterias">Baterías</a></li>
            <li><a href="#bajos">Bajos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="carrito.html" id="carrito-icono" target="_blank">Carrito (<span id="carrito-count">0</span>)</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Tu contenido principal */}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
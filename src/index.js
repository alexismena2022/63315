import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Archivo CSS si quieres personalizar tu diseño
import App from './components/app'; // Componente principal

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
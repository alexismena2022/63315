const path = require('path');

module.exports = {
  mode: 'development', // Establece el modo de desarrollo
  entry: './src/index.js', // Punto de entrada para React
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Archivo de salida con todo el código compilado
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica Babel a archivos JS
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'), // Servir contenido desde 'dist'
    compress: true,
    port: 9000, // Puerto donde se ejecutará el servidor
  },
};

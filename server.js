/**
 * Servidor Express simple para desplegar en Render
 * Sirve archivos estáticos HTML, CSS y JavaScript
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta raíz
app.use(express.static(path.join(__dirname)));

// Redireccionar la ruta raíz a la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
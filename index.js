const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/pagina-menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina-menu.html'));
});

app.get('/reservaciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reservaciones.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const dotEnv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 8081;

// TODO: Contenido Estatico
// pagina statica
app.use('/', express.static(__dirname + '/public'));
app.use('/roadtrip', express.static(__dirname + '/roadtrip'));
app.get('/roadtrip/generic', (req, res) => {
  res.sendFile(__dirname + '/roadtrip/generic.html');
});
app.get('/roadtrip/elements', (req, res) => {
  res.sendFile(__dirname + '/roadtrip/elements.html');
});

// Todo esto es para contenido statico.
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
});

// Express HBS engine
// hbs.registerPartials(__dirname + '/views/parciales');
// app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//   res.render('home', {
//     nombre: 'fernando',
//   });
// });

app.get('/about', (req, res) => {
  res.render('about');
});

// app.get('*', (req, res) => {
//   res.status(404).json({ err: 404, msg: 'Page not found' });
// });

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});

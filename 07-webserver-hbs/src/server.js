const dotEnv = require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 8081;

// handlebars
hbs.registerPartials(__dirname + '/views/partials', (err) => {
  if (err) console.log(err);
});
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public_hbs'));
app.get('/', (req, res) => {
  res.render('home', { nombre: 'Pedro Obando', title: 'Curso de Node.Js' });
});

app.get('/generic', (req, res) => {
  res.render('generic');
});

app.get('/elements', (req, res) => {
  res.render('elements');
});

// Todo esto es para contenido statico.
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
  console.log(`Servidor Dinamico con handlebars`);
});

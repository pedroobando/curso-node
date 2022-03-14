const express = require('express');
// const { json, urlencoded } = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    // PUERTO DEL SERVIDOR
    this.port = process.env.PORT || 8080;
    this.usersPath = '/api/users';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // JSON - bodyparse
    this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: false }));
    // CORS
    this.app.use(cors({ origin: '*' }));
    // Directorio Público
    // console.log(__dirname + '/../public');
    this.app.use(express.static(__dirname + '/../public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running at port: ${this.port}`);
    });
  }
}

module.exports = Server;

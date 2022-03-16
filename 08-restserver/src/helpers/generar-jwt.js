const JWT = require('jsonwebtoken');

const createToken = (uid = '') =>
  new Promise((resolve, reject) =>
    JWT.sign(
      { uid },
      process.env.SECRET_JWT,
      { expiresIn: process.env.TOKEN_EXPIRES_IN },
      (err, token) => {
        if (err) {
          reject('Error generando token');
        }
        resolve(token);
      },
    ),
  );

const verifyToken = (token) => JWT.verify(token, process.env.SECRET_JWT);

module.exports = { createToken, verifyToken };

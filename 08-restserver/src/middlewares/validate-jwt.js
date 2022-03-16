const { request, response } = require('express');
const { verifyToken } = require('../helpers/generar-jwt');
const User = require('../database/models/user');

const validateJWT = async (req = request, res = response, next) => {
  try {
    const authHeader = req.headers.authorization || null;

    if (!authHeader) {
      return res.status(401).json({ err: 'Token no valid - not has token' });
    }

    const token = authHeader.split(' ')[1];
    payload = verifyToken(token);
    const { uid } = payload;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({ err: 'Token no valid - user no fund' });
    }

    if (!user.active) {
      return res.status(401).json({ err: 'Token no valid - not active user' });
    }
    req.uid = uid;
    req.uauth = user;

    next();
  } catch (error) {
    res.status(401).json({ err: 'Token no valid' });
  }
};

module.exports = { validateJWT };

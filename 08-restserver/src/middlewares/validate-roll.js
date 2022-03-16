const { response } = require('express');

const isAdminRoll = (req, res = response, next) => {
  try {
    if (!req.uauth) {
      return res.status(500).json({ err: `Se require verificacion de roll sin validar token` });
    }

    if (req.uauth.roll !== 'ADMIN_ROLL') {
      return res
        .status(401)
        .json({ err: `El usuario ${req.uauth.name} no tiene privilegios de administrador` });
    }

    next();
  } catch (error) {
    return res.status(500).json({ err: 'Error no controlado en middlewares - isAdminRoll' });
  }
};

const isHaveOnlyRoll = (rollList = []) => {
  return (req, res = response, next) => {
    try {
      if (!req.uauth) {
        return res.status(500).json({ err: `Se require verificacion de roll sin validar token` });
      }

      if (!rollList.includes(req.uauth.roll)) {
        return res.status(401).json({ err: `El usuario no tiene priviegios para esta accion` });
      }

      next();
    } catch (error) {
      return res.status(500).json({ err: 'Error no controlado en middlewares - isHaveRoll' });
    }
  };
};

module.exports = { isAdminRoll, isHaveOnlyRoll };

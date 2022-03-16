const { request, response } = require('express');
const User = require('../database/models/user');
const { cifrateVerify } = require('../helpers/cifrate');
const { createToken } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  const errMsg = 'Error en usuario / password';
  try {
    const existUser = await User.findOne({ email, active: true });
    if (!existUser) return res.status(403).json({ err: `${errMsg} - email` });

    const validPassword = await cifrateVerify(password, existUser.password);
    if (!validPassword) return res.status(403).json({ err: `${errMsg} - password` });

    const token = await createToken(existUser.id);

    res.status(200).json({ err: null, user: existUser, token });
  } catch (error) {
    res.status(200).json({ err: error.message, login: req.body });
  }
};

module.exports = { login };

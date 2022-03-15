const { request, response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../database/models/user');
const { cifrate } = require('../tools/cifrate');

const userGet = (req = request, res = response) => {
  const { page = 1, limit = 10, orderby = 'asc' } = req.query;
  res.json({ msg: 'get api - controllers', query: { page: parseInt(page, 10), limit, orderby } });
};

const userPost = async (req = request, res = response) => {
  const { password, email } = req.body;
  const body = req.body;

  try {
    body.created_at = Date.now();
    body.updated_at = Date.now();
    body.password = await cifrate(password);
    const createUser = new User(body);
    await createUser.validate();
    await createUser.save();

    // const { google, password: noPass, ...returnUser } = createUser._doc;
    res.status(201).json({ err: null, user: createUser });
  } catch (error) {
    if (error.code == 11000)
      res.status(400).json({
        err: `Duplicidad en datos ${body.email}, registrado con anterioridad.`,
        user: null,
      });
    else
      res
        .status(500)
        .json({ err: 'Problema ingresando datos del usuario!', error: error.message, user: null });
  }
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, ...rest } = req.body;
  try {
    rest.updated_at = Date.now();
    const updateUser = await User.findByIdAndUpdate(id, rest, { new: true });
    await updateUser.validate();

    const { google, password: nopass, ...returnUser } = updateUser._doc;
    res.status(200).json({ err: null, user: returnUser });
  } catch (error) {
    if (error.code == 11000)
      res.status(400).json({
        err: `Duplicidad en datos ${body.email}, registrado con anterioridad.`,
        user: null,
      });
    else
      res.status(500).json({
        err: 'Problema actualizando datos del usuario!',
        error: error.message,
        user: null,
      });
  }
};

const userDelete = (req = request, res = response) => {
  res.json({ msg: 'delete api - controllers' });
};

const userPatch = (req = request, res = response) => {
  res.json({ msg: 'patch api - controllers' });
};

module.exports = { userGet, userDelete, userPatch, userPost, userPut };

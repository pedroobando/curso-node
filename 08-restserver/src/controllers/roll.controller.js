const { request, response } = require('express');
const Roll = require('../database/models/roll');

const rollGet = (req = request, res = response) => {
  const { page = 1, limit = 10, orderby = 'asc' } = req.query;
  res.json({ msg: 'get api - controllers', query: { page: parseInt(page, 10), limit, orderby } });
};

const rollPost = async (req = request, res = response) => {
  const { roll } = req.body;
  const { body } = req;

  const rollUpc = roll.toString().toUpperCase();
  const findRoll = await Roll.findOne({ rollUpc });
  if (findRoll) {
    return res.status(400).json({ err: `El roll ${rollUpc} ya esta registrado.`, roll: null });
  }
  console.log(findRoll);

  try {
    body.created_at = Date.now();
    body.updated_at = Date.now();
    body.roll = rollUpc;
    const createRoll = new Roll(body);
    await createRoll.validate();
    await createRoll.save();

    res.status(201).json({ err: null, roll: createRoll });
  } catch (error) {
    res.status(500).json({ err: 'Problema ingresando el roll!', error: error.message, roll: null });
  }
};

const rollPut = async (req = request, res = response) => {
  const { id } = req.params;
  const body = req.body;
  try {
    body.updated_at = Date.now();
    const updateRoll = await Roll.findByIdAndUpdate(id, body, { new: true });
    await updateRoll.validate();

    res.status(200).json({ err: null, roll: updateRoll });
  } catch (error) {
    res.status(500).json({ err: 'Problema actualizando Roll!', roll: null });
  }
};

const rollDelete = (req = request, res = response) => {
  res.json({ msg: 'delete api - controllers' });
};

module.exports = { rollDelete, rollGet, rollPost, rollPut };

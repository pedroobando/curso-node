const { request, response } = require('express');
const User = require('../database/models/user');
const { cifrate } = require('../helpers/cifrate');
const { faker } = require('@faker-js/faker');
const { eatGetCollecc, paginateRange } = require('../helpers/db-paginate');

const userGet = async (req = request, res = response) => {
  const { page = 1, limit = 10, orderby = 'asc' } = req.query;

  try {
    condition = { active: true };
    const { toSkip, tolimit } = eatGetCollecc(page, limit);
    const resolv = await Promise.all([
      User.countDocuments(condition),
      User.find(condition).skip(toSkip).limit(tolimit),
    ]);
    const [totalItem, users] = resolv;
    const paginate = paginateRange(page, tolimit, totalItem);

    res.status(200).json({ err: null, data: users, paginate });
  } catch (error) {
    res.status(500).json({ err: 'Problemas mostrando usuario', error: error.message, user: null });
  }
};

const userPost = async (req = request, res = response) => {
  const { password, active, ...restProps } = req.body;
  const body = req.body;

  try {
    restProps.password = await cifrate(password);
    restProps.active = true;
    const createUser = new User(restProps);
    await createUser.validate();
    await createUser.save();

    // const { google, password: noPass, ...returnUser } = createUser._doc;
    res.status(201).json({ err: null, user: createUser });
  } catch (error) {
    res
      .status(500)
      .json({ err: 'Problema ingresando el usuario!', error: error.message, user: null });
  }
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, ...restProps } = req.body;
  try {
    restProps.updated_at = Date.now();
    const updateUser = await User.findByIdAndUpdate(id, restProps, { new: true });
    // await updateUser.validate();
    // const { google, password: nopass, ...returnUser } = updateUser._doc;
    res.status(200).json({ err: null, user: updateUser });
  } catch (error) {
    res
      .status(500)
      .json({ err: 'Problema actualizando usuario', error: error.message, user: null });
  }
};

const userChangePassword = async (req = request, res = response) => {
  const { id } = req.params;
  let { password, updated_at } = req.body;

  try {
    updated_at = Date.now();
    password = await cifrate(password);
    const updateUser = await User.findByIdAndUpdate(id, { password, updated_at }, { new: true });
    res.status(200).json({ err: null, user: updateUser });
  } catch (error) {
    res
      .status(500)
      .json({ err: 'Problema actualizando password', error: error.message, user: null });
  }
};

const userDelete = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const updated_at = Date.now();
    const active = false;
    const deleteUser = await User.findByIdAndUpdate(id, { active, updated_at }, { new: true });
    res.status(200).json({ err: null, user: deleteUser });
  } catch (error) {
    res.status(500).json({ err: 'Problema eliminando usuario', error: error.message, user: null });
  }
};

const userGen = async (req = request, res = response) => {
  const { userTotal } = req.query;

  try {
    let dummyUser = {};
    let contador = 0;
    do {
      dummyUser.name = faker.name.firstName() + ' ' + faker.name.lastName();
      dummyUser.email = faker.internet.email();
      dummyUser.password = faker.internet.password();
      dummyUser.roll = 'ADMIN_ROLL';
      // body.password = await cifrate(password);
      const createUser = new User(dummyUser);
      await createUser.validate();
      await createUser.save();
      contador++;
    } while (contador <= parseInt(userTotal, 10));
    // body.created_at = Date.now();
    // body.updated_at = Date.now();

    // const { google, password: noPass, ...returnUser } = createUser._doc;
    res.status(201).json({ err: null, user: true });
  } catch (error) {
    res
      .status(500)
      .json({ err: 'Problema ingresando el usuario!', error: error.message, user: null });
  }
};

module.exports = { userGet, userDelete, userPost, userPut, userChangePassword, userGen };

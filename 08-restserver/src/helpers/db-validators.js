const Roll = require('../database/models/roll');
const User = require('../database/models/user');

const isRollValid = async (roll = '') => {
  const rollExist = await Roll.findOne({ roll });
  if (!rollExist) throw new Error(`El roll ${roll} no esta registrado en DB`);
};

const isExistEmail = async (email = '') => {
  const findUser = await User.findOne({ email });
  if (findUser) throw new Error(`El roll ${email} esta registrado en DB`);
};

const isExistUserById = async (id) => {
  const findUser = await User.findById(id);
  if (!findUser) throw new Error(`El usuario no esta registrado`);
};

module.exports = { isRollValid, isExistEmail, isExistUserById };

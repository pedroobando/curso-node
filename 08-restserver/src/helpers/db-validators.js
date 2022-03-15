const Roll = require('../database/models/roll');
const User = require('../database/models/user');

const isRollValid = async (roll = '') => {
  const rollExist = await Roll.findOne({ roll });
  if (!rollExist) throw new Error(`El roll ${roll} no esta registrado en DB`);
};

const existEmail = async (email = '') => {
  const findUser = await User.findOne({ email });
  if (findUser) throw new Error(`El email ${email} ya esta registrado`);
};

module.exports = { isRollValid, emailExist: existEmail };

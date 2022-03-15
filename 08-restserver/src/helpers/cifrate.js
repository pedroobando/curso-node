const bcryptjs = require('bcryptjs');

const cifrate = async (sword) => bcryptjs.hashSync(sword, bcryptjs.genSaltSync(10));

const cifrateVerify = async (swordOne, swordTwo) => bcryptjs.compareSync(swordOne, swordTwo);

module.exports = { cifrate, cifrateVerify };

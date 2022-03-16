const { Router } = require('express');
const { fieldValidate } = require('../middlewares/validate-field');

const { isRollValid, emailExist, isExistUserById } = require('../helpers/db-validators');
const { login } = require('../controllers/auth.controller');
const { body } = require('express-validator');

router = Router();

router.post(
  '/login',
  [
    body('email', 'Correo o email no es valido').isEmail(),
    body('password', 'El password es requerido').not().isEmpty(),
  ],
  fieldValidate,
  login,
);

// router.put(
//   '/:id',
//   [
//     param('id', 'No es un id valido').isMongoId(),
//     param('id').custom(isExistUserById),
//     body('roll').custom(isRollValid),
//   ],
//   fieldValidate,
//   userPut,
// );

// router.put(
//   '/password/:id',
//   [
//     param('id', 'No es un id valido').isMongoId(),
//     param('id').custom(isExistUserById),
//     body('password', 'El password es requerido y mayor que 4 caracteres')
//       .isString()
//       .isLength({ min: 5 }),
//   ],
//   fieldValidate,
//   userChangePassword,
// );

// router.delete(
//   '/:id',
//   [param('id', 'No es un id valido').isMongoId(), param('id').custom(isExistUserById)],
//   fieldValidate,
//   userDelete,
// );

module.exports = router;

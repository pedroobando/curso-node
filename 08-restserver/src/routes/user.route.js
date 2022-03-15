const { Router } = require('express');
const { body } = require('express-validator');
const { fieldValidate } = require('../middlewares');
const {
  userGet,
  userPut,
  userDelete,
  userPatch,
  userPost,
} = require('../controllers/user.controller');
const { isRollValid, emailExist } = require('../helpers/db-validators');

router = Router();

router.get('/', userGet);
router.post(
  '/',
  body('name', 'El nombre es obligatorio').not().isEmpty(),
  body('email', 'Correo o email no es valido').isEmail().custom(emailExist),
  body('password', 'El password es requerido y mayor que 4 caracteres')
    .isString()
    .isLength({ min: 5 }),
  // body('roll', 'No es un roll valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  body('roll').custom(isRollValid),
  fieldValidate,
  userPost,
);
router.put('/:id', userPut);
router.delete('/:id', userDelete);
router.patch('/', userPatch);

module.exports = router;

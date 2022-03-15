const { Router } = require('express');
const { body, param, query } = require('express-validator');
const { fieldValidate } = require('../middlewares');
const {
  userGet,
  userPut,
  userDelete,
  userPatch,
  userPost,
  userChangePassword,
  userGen,
} = require('../controllers/user.controller');
const { isRollValid, emailExist, isExistUserById } = require('../helpers/db-validators');

router = Router();

router.get('/', userGet);
router.get(
  '/gen',
  query('userTotal', 'Indique la cantidad de usuarios a crear').not().isEmpty(),
  fieldValidate,
  userGen,
);
router.post(
  '/',
  [
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'Correo o email no es valido').isEmail().custom(emailExist),
    body('password', 'El password es requerido y mayor que 4 caracteres')
      .isString()
      .isLength({ min: 5 }),
    // body('roll', 'No es un roll valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    body('roll').custom(isRollValid),
  ],
  fieldValidate,
  userPost,
);

router.put(
  '/:id',
  [
    param('id', 'No es un id valido').isMongoId(),
    param('id').custom(isExistUserById),
    body('roll').custom(isRollValid),
  ],
  fieldValidate,
  userPut,
);

router.put(
  '/password/:id',
  [
    param('id', 'No es un id valido').isMongoId(),
    param('id').custom(isExistUserById),
    body('password', 'El password es requerido y mayor que 4 caracteres')
      .isString()
      .isLength({ min: 5 }),
  ],

  fieldValidate,
  userChangePassword,
);

router.delete('/:id', userDelete);
router.patch('/', userPatch);

module.exports = router;

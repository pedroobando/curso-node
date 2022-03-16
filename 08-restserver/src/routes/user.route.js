const { Router } = require('express');
const { body, param, query } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');

const {
  userGet,
  userPut,
  userDelete,
  userPost,
  userChangePassword,
  userGen,
} = require('../controllers/user.controller');

const { fieldValidate } = require('../middlewares/validate-field');
const { isRollValid, isExistEmail, isExistUserById } = require('../helpers/db-validators');

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
    body('email', 'Correo o email no es valido').isEmail(),
    body('email').custom(isExistEmail),
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

router.delete(
  '/:id',
  validateJWT,
  [param('id', 'No es un id valido').isMongoId(), param('id').custom(isExistUserById)],
  fieldValidate,
  userDelete,
);

module.exports = router;

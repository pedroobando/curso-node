const { Router } = require('express');
const { body } = require('express-validator');
const { rollGet, rollPost, rollPut, rollDelete } = require('../controllers/roll.controller');

const { fieldValidate } = require('../middlewares');

router = Router();

router.get('/', rollGet);
router.post('/', body('roll', 'El roll es obligatorio').not().isEmpty(), fieldValidate, rollPost);
router.put('/:id', rollPut);
router.delete('/:id', rollDelete);

module.exports = router;

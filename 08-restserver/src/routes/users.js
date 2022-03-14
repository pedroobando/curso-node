const { Router } = require('express');
const { userGet, userPut, userDelete, userPatch, userPost } = require('../controllers/users');

router = Router();

router.get('/', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.delete('/:id', userDelete);
router.patch('/', userPatch);

module.exports = router;

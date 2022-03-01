const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../helpers/verifyToken');

router.get('/getUser', verifyToken, userController.getUser);
router.get('/getUsers', userController.getUsers);
router.get('/verifytoken', verifyToken, userController.verifyToken);

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/createUser', userController.createUser)

router.put('/edit/:id', verifyToken, userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
import express from 'express';
import userController from '../controllers/userController.js';
var router = express.Router();

/* GET users listing /users/ */
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.post('/login', userController.login);

export default router

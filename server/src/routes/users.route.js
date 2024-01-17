import express from 'express';
import userController from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/:mssv', userController.getByMSSV);
router.delete('/:mssv', userController.delete);
router.patch('/', userController.register);

export default router;
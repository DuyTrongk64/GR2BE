import express from 'express';
import Controller from '../controllers/.controller.js';

const router = express.Router();

router.get('/', Controller.getAll);
router.post('/', Controller.create);
router.get('/:id', Controller.getById);
router.delete('/:id', Controller.delete);
router.patch('/:id', Controller.update);

export default router

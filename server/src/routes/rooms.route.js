import express from 'express';
import roomController from '../controllers/rooms.controller.js';

const router = express.Router();

router.get('/', roomController.getRoomByName);
router.delete('/', roomController.delete);
router.get('/aparts', roomController.getAllByApart);
router.get('/:id', roomController.getUserRoom);

export default router;
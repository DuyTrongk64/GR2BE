import express from 'express';
import registerController from '../controllers/register.controller.js';

const router = express.Router();

router.get('/', registerController.getAllApartment);
router.get('/aparts', registerController.getAllRoomNotFull);

export default router;
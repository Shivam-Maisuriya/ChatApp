import express from 'express';
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();

router.post('/send/:id',secureRoute, sendMessage)   // :id is known as a route parameter or param
router.get('/get/:id',secureRoute, getMessage)              


export default router;
import { Router } from "express";
const router = Router();
import * as controller from '../controllers/routeController.js';

router.route('/route/:username/:origin/:desination/:distance/:transportmode').get(controller.addroute) 

export default router


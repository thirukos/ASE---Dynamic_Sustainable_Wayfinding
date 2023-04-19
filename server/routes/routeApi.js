import { Router } from "express";
const router = Router();
import * as controller from '../controllers/routeController.js';

router.route('/route').post(controller.addroute) 

export default router


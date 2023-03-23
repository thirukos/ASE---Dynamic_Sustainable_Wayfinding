import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/pubController.js';

/** GET Methods */
router.route('/pubtrans').get(controller.getTrans) // user with username


export default router;
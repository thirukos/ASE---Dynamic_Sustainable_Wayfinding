import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/riskApiController.js';

/** GET Methods */
// router.route('/weather/:lat/:lon/:date').get(controller.getWeather)
router.get('/risk/:lat/:lon/:date', controller.getRisk);

export default router
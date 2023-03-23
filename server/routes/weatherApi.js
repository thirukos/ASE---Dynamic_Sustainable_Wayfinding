import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/weatherApiController.js';

/** GET Methods */
// router.route('/weather/:lat/:lon/:date').get(controller.getWeather)
router.get('/weather/:lat/:lon', controller.getWeather);

export default router
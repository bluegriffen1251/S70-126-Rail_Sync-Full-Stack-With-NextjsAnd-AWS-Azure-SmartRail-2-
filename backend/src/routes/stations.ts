import { Router } from 'express';
import { getAllStations } from '../controller/stationController';

const router = Router();

router.get('/', getAllStations);

export default router;
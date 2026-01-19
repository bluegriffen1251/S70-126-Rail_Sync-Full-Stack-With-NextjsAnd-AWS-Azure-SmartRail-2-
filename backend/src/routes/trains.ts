import { Router } from 'express';
import { getTrains } from '../controller/trainController';

const router = Router();

// GET /api/trains
router.get('/', getTrains);

export default router;
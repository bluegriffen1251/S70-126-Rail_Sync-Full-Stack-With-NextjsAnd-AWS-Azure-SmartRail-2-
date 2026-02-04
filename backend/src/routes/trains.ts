import { Router } from 'express';
import { getTrains, getTrainById } from '../controller/trainController';

const router = Router();

// ✅ Route 1: List all trains
router.get('/', getTrains);

// ✅ Route 2: Get details for one train (ID or Number)
router.get('/:id', getTrainById);

export default router;
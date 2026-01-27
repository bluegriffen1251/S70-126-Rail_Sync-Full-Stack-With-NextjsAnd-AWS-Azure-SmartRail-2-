import { Router } from 'express';
import { getTrains, bookSeat } from '../controller/trainController';
import { getLiveStatus } from '../controller/liveStatusController'; // <--- Check this import

const router = Router();

router.get('/', getTrains);
router.post('/book', bookSeat);
router.get('/live/:trainNumber', getLiveStatus); // <--- This MUST be here

export default router;
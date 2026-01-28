import express from 'express';
import { getMyBookings } from '../controller/bookingController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/bookings (Protected)
router.get('/', authenticateToken, getMyBookings);

export default router;
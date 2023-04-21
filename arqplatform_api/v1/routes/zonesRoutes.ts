import { Router } from 'express';
import { getZones } from '../../controllers/zonesController';

const router = Router();

router.get('/', getZones);

export default router;

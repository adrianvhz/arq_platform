import { Router } from 'express';
import { getTypeProjectBySlug, getTypeProjects } from '../../controllers/typeProjectController';

const router = Router();

router.get('/', getTypeProjects);
router.get('/:slug/', getTypeProjectBySlug);

export default router;

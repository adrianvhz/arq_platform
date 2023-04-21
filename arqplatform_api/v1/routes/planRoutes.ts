import { Router } from "express";
import { addPlanController, showPlanController } from "../../controllers/planController";

const router =  Router();

router.post('/add',addPlanController);
router.post('/show',showPlanController);

export default router;

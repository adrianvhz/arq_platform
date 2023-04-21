import { Router } from "express";
import { addDetailPlanPermissionController } from "../../controllers/detailPlanPermissionController";

const router =  Router();

router.post('/add', addDetailPlanPermissionController);


export default router;
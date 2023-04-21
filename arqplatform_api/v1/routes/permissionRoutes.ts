import { Router } from "express";
import { addPermissionController } from "../../controllers/permisoController";

const router =  Router();

router.post('/add',addPermissionController);


export default router;
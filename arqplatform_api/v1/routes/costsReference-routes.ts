import { Router } from "express";
import multer from "multer";
import { getCosts, updateCosts } from "../../controllers/costsReference-controller";
import costsRefereceErrorHandler from "../../middlewares/costsReferece-errorHandler";
import type { Request, Response, NextFunction } from "express";

const errPipe = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err)); // catch(next);
}

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.get("/", errPipe(getCosts));
router.put("/", upload.single("file"), errPipe(updateCosts));

/* error handler */
router.use(costsRefereceErrorHandler);

export default router;

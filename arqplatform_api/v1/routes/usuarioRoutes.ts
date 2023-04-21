import { Router } from "express";
import { getUsuario, getUsuarios, postUsuario, putUsuario } from "../../controllers/usuarioController";
import { checkSchema } from "express-validator";
import { ValidateCampos } from "../../middlewares/user";
import usersErrorHandler from "../../middlewares/usersErrorHandler";
import type { Request, Response, NextFunction } from "express";

// Note: Search for sofisticated pipes

const errPipe = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err)); // catch(next);
}

const router = Router();
router.get("/", errPipe(getUsuarios));
router.get("/:id", errPipe(getUsuario));
router.post("/",
	checkSchema({
		email: { notEmpty: true, errorMessage: "email es obligatorio" },
		password: { notEmpty: true, errorMessage: "password es obligatorio" },
		name: { notEmpty: true, errorMessage: "name es obligatorio" },
		lastname: { notEmpty: true, errorMessage: "lastname es obligatorio" }
	}),
	ValidateCampos,
	errPipe(postUsuario)
);
router.put("/:id", putUsuario);

/* error handler */
router.use(usersErrorHandler);

export default router;

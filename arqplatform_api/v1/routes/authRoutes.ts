import { Router } from "express";
import { loginUser, registerUser, revalidarToken, verifySSO, loginSSO, logoutSSO }  from  "../../controllers/authController";
import { validateEmail, ValidateCampos } from "../../middlewares/user";
import { body }  from  "express-validator"
import { validateJWT } from "../../middlewares/validate-jwt";
import authErrorHandler from "../../middlewares/authErrorHandler";
import type { Request, Response, NextFunction } from "express";

const errPipe = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err)); // catch(next);
}

const registerValidations = () => {
	return [
		body("email", "Esto no es un email").isEmail().custom(validateEmail), // Si se usa custom() y la fn no devuelve un booleano, entonces se usara el mensaje de la promesa (ya sea resolve o reject) o del mensaje en el throw new Error(msg);
		body("name", "El nombre es obligatorio").not().isEmpty(),
		body("lastname", "El apellido es obligatorio").not().isEmpty(),
		body("password", "La contraseña debe tener más de 6 de letras").isLength({ min: 6 }),
		ValidateCampos
	]
}

const router = Router();
router.post('/login', errPipe(loginUser));
router.post('/register', registerValidations(), errPipe(registerUser));
router.get("/renew", [validateJWT], revalidarToken);
router.post("/verifySSO", errPipe(verifySSO));
router.post("/loginSSO", errPipe(loginSSO));
router.post("/logoutSSO", errPipe(logoutSSO));

/* error handler */
router.use(authErrorHandler);

export default router;

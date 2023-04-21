import { Request, Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { Constantes } from '../config/Constante';



export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('x-token')

        if (!token) return res.status(401).json({
            ok: false,
            msg: 'No existe el token'
        });

        try {
            const payload: any = jwt.verify(token, Constantes.key);

            req.body.id = payload.id

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido'
            });
        }

        next();
}
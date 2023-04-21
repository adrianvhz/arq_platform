import {
	getUsuarioService,
	getUsuariosService,
	postUsuarioService,
	putUsuarioService,
	deleteUserService
} from "../services/usuarioService";
import type { Request, Response } from "express";

export const getUsuarios = async (req: Request, res: Response) => {
	await getUsuariosService(req, res);
}
export const getUsuario = async (req: Request, res: Response) => {
	await getUsuarioService(Number(req.params.id), res);
}

export const postUsuario = async (req: Request, res: Response) => {
	await postUsuarioService(req, res);
	// esto no se ejecutaria si se entra al error handler al haber un error (en este caso en el servicio).
	console.log("usuarioController.ts / postUsuario");
}

export const putUsuario = async (req: Request, res: Response) => {
  const usuario = await putUsuarioService(req);
  try {
   
    res.status(200).json(
        usuario
     );
  } catch (error) {
    res.status(401).json(
      usuario
   );
  }
};

export const deleteUser = (req: Request, res: Response) => {
	return deleteUserService(req, res);
}

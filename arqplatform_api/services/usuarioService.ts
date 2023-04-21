import bcrypt from "bcryptjs";
import User from "../models/mariadb/user";
import { Constantes } from "../config/Constante";
import { HttpException } from "../Exceptions/HttpException";
import { IResponseApi } from "../interfaces/response";
import type { Request, Response } from "express";

export const getUsuariosService = async (req: Request, res: Response) => {
	const users = await User.findAll();

	res
		.status(200)
		.json({
			statusCode: 200,
			message: "Usuarios obtenidos correctamente",
			data: users
		});
}

export const getUsuarioService = async (id: number, res: Response) => {
	const user = await User.findByPk(id);
	
	if (!user) {
		throw new HttpException(400, "El usuario no existe");
	}

	res
		.status(200)
		.json({
			statusCode: 200,
			message: "Usuario obtenido correctamente",
			data: user
		});
}

export const postUsuarioService = async (req: Request, res: Response) => {
	res.status(200).json({
		statusCode: 200,
		message: "Building endpoint...",
		data: null
	})
}

export const putUsuarioService = async (req: Request): Promise<IResponseApi> => {
	const {  name, lastname, email,password,flag } = req.body;
	const { id } = req.params

	try {

	//uptdate dates
	if (flag === 1) {
		await User.update(
			{
				name: name,
				lastname: lastname
			},
			{ where: { id: id } }
		);
	}

	//update email
	if (flag === 2) {
		await User.update(
			{
				email: email
			},
			{ where: { id: id } }
		);
	}

	//update email
	if (flag === 3) {

		const passwordNEW = await bcrypt.hash(password, Constantes.salt);
		
		await User.update(
			{
				password: passwordNEW
			},
			{ where: { id: id } }
		);
	}

	const user = await User.findOne({ 
		where: { id: id }
	});

	return {
		msg: "Se actualizo correctamente",
		data: user,
		error: null
	}

	} catch (error) {
		return {
			msg: 'Ocurrio un error',
			data: null,
			error: null
		}
	}
	// const  {id} = req.params
	// const {body} = req;
}

export const deleteUserService = (req: Request, res: Response) => {
	User.destroy({
		where: { id: req.params.id }
	})
}

import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import User from "./../models/mariadb/user";
import { BadRequestException, UnauthorizedException  } from "../Exceptions";
import { generateJWT, checkAuthMaster, execVerifySSO, execLoginSSO, execLogoutSSO } from "../utils";
import { Planes, DetailUserPlan, DetailPlanPermission, Permiso } from "../models/mariadb"
import { Constantes } from "./../config/Constante";
import { IResponseApi, UserPlanPermiso } from "../interfaces";
import type { Request, Response } from "express";
import { request } from "../utils/request";
import { getUserMaster } from "../utils/getUserMaster";

export const loginUserService = async (req: Request, res: Response): Promise<any> => { // Promise<ResponseApi>
	const { email, password } = req.body;
	const { success, data } = await checkAuthMaster("login", { user: email, password }) as any;

	if (!success) {
		throw new UnauthorizedException("Las credenciales no son correctas");
	}

	// @ts-ignore
	const [user, created] = await User.findOrCreate({
		where: { email: email },
		defaults: {
			id_master: Number(data.id),
			name: data.name,
			lastname: data.lastname,
			email: email,
			password: await bcrypt.hash(password, Constantes.salt)
		}
	});

	if (created) { // @ts-ignore
		const detailUserPlan = new DetailUserPlan({
			iduser: user.id,
			idplan: 1,
			estado: 1
		});

		detailUserPlan.save();
		
		console.log("El usuario se creo correctamente en ProDesign DB")
	}

	// const user = await User.findOne({ where: {email: email} });

	// if (!user && success) {
	// 	const newUser = new User()
	// }

	// const isCorrectPassword = await bcrypt.compare(password, user.password);
	
	// if (!isCorrectPassword) {
	// 	throw new UnauthorizedException("La contraseña es incorrecta");
	// }

	// generate JWT
	const token = await generateJWT(user.id as number, Constantes.key);

	res
		.status(200)
		.json({
			statusCode: 200,
			message: "Sesión iniciada correctamente",
			data: {
				usuario: user,
				id_master: Number(data.id),
				token: token
			},
			info: created ? "Se ha registrado al usuario" : undefined
		});
}

export const registerUserService = async (req: Request, res: Response) => {
	const { email, password, ...rest } = req.body;

	// si user no existe (osea success es true), se registra en la master
	const { success } = await checkAuthMaster("register", {
		user: email,
		password: password,
		...rest
	}) as any;

	// Significa que un usuario se registro en la master desde ProDesign
	if (success) console.log("El usuario se creo correctamente en ambas db."); 
	// Significa que un usuario se intento registrar en ProDesign pero ya tiene una cuenta en la master
	else console.log("El usuario existe en master auth");

	if (!success) {
		throw new BadRequestException("El correo ya esta registrado (register service)");
	}

	// Solo si es success === true (Primera vez que se registra en master y en ProDesign)

	const { data: dataUser } = await checkAuthMaster("login", { user: email, password }) as any;

	// @ts-ignore
	const user = new User({
		id_master: Number(dataUser.id),
		email: email,
		password: await bcrypt.hash(password, Constantes.salt),
		...rest
	});
	
	const usuario = await user.save();

	// asignar plan a tabla `Detail user plan`
	// @ts-ignore
	const plan = await Planes.findOne({ where: { defecto: 1 } });

	const iduser = usuario.id;
	const idplan = plan!.id;
	
	// @ts-ignore
	const datailUserPlan = new DetailUserPlan({
		iduser: iduser,
		idplan: idplan,
		estado: 1
	});

	await datailUserPlan.save();

	// @ts-ignore
	const permisosDetail = await DetailPlanPermission.findAll({ // @ts-ignore
		where: { idplan: idplan }
	});

	let idpermisos: any = [];

	permisosDetail.forEach((p) => {
		idpermisos.push(p.idpermiso);
	});

	// @ts-ignore
	const permisos = await Permiso.findAll({
		where: { // @ts-ignore
			id: { [Op.in]: idpermisos }
		}
	});

	const userplanpermiso: UserPlanPermiso = {
		user: usuario,
		plan: plan!,
		permisos: permisos,
	}

	res
		.status(201)
		.json({
			statusCode: 201,
			message: "Usuario registrado correctamente",
			data: userplanpermiso
		});
}

export const revalidarTokenService = async (req: Request): Promise<IResponseApi> => {
	const { id } = req.body;
	
	// @ts-ignore
	const usuario = await User.findOne({ // @ts-ignore
		where: { id: id }
	});

	return {
		msg: "usuario correcto",
		data: usuario,
		error: null
	}
}

export const verifySSOService = async (req: Request, res: Response) => {
	const { success, data, message } = await execVerifySSO(req.body);

	if (!success) {
		return res.status(200).json({
			statusCode: 200,
			success: false,
			message: "El usuario no esta logeado (SSO)",
			info: message
		})
	}

	// @ts-ignore
	let user = await User.findOne({
		where: {
			id_master: Number(data.user.id)
		}
	});

	if (!user) {
		const userMaster = await getUserMaster(data.user.email);
		
		user = await User.create({
			id_master: Number(data.user.id),
			email: data.user.email,
			name: userMaster.name,
			lastname: userMaster.lastname,
			password: "defaultPassword/$(0_9)#-#[a-Z]%^{:D}"
		});
	}

	res
		.status(200)
		.json({
			statusCode: 200,
			success: success,
			data,
			user: user,
			message
		})
}

export const loginSSOService = async (req: Request, res: Response) => {
	const { success, data, message } = await execLoginSSO(req.body);

	if (!success) {
		return res.status(200).json({
			statusCode: 200,
			success,
			message: "No se pudo logear al usuario (SSO)",
			info: message
		})
	}

	const user = await User.findOne({
		where: {
			id_master: Number(data.result.id)
		}
	});

	res
		.status(200)
		.json({
			statusCode: 200,
			success: success,
			data,
			user: user,
			message
		})
}

export const logoutSSOService = async (req: Request, res: Response) => {
	const data = await execLogoutSSO(req.body);
	console.log(data)
	res.status(200).json({
		statusCode: 200,
		data
	})
}

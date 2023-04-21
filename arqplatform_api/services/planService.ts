import User from "../models/mariadb/user";
import Planes from "../models/mariadb/plan";
import { IResponseApi } from "../interfaces/response";
import Permiso from './../models/mariadb/permiso';
import { Request } from "express";

export const addPlanService = async (req: Request): Promise<IResponseApi> => {
  const { body } = req;

  try {
    const plan = new Planes(body);
    const planes = await plan.save();

    return {
      msg: "Plan registrado correctamente",
      data: planes,
      error: [],
    };
  } catch (error: any) {
    return {
      msg: "Ocurrio un error",
      data: {},
      error: error.errors,
    };
  }
};

export const showPlanService = async (req: Request): Promise<IResponseApi> => {
	const { body } = req;
	const { iduser,estado } = body
	try {

		const data = await User.findAll({
		where: { id : iduser },
		include: [
			{ model: Planes, include: [Permiso] }
		]
		}).catch(e => console.log(e))

		return {
			msg: "Plan registrado correctamente",
			data,
			error: [],
		};
	} catch (error: any) {
		return {
			msg: "Ocurrio un error",
			data: {},
			error: error.errors,
		}
	}
}

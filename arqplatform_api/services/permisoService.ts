import { IResponseApi } from "../interfaces/response";
import Permiso from "../models/mariadb/permiso";
import type { Request } from "express";


export const addPermissionService = async (req:Request) :  Promise<IResponseApi> =>{

    const { body } = req;

    try {
      const permiso = new Permiso(body);
      const permisos = await permiso.save();
  
      return {
        msg: "Permiso registrado correctamente",
        data: permisos,
        error: [],
      };
    } catch (error:any) {
      return {
        msg: "Ocurrio un error",
        data: {},
        error: error.errors,
      };
    }

}
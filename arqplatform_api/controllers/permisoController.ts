
import { Request,Response } from 'express';
import { addPermissionService } from './../services/permisoService';


export const addPermissionController = async ( req:Request, res:Response)=> {

    const permiso = await addPermissionService(req);

    try {
        if (permiso.error.length === 0) {
          res.status(201).json(permiso);
        } else {
          res.status(401).json(permiso);
        }
      } catch (error) {
        return res.status(500).json(error)
      }

      
}
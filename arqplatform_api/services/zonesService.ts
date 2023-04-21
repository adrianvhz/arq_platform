import { Request } from 'express';
import Zones from '../models/mariadb/zones';

// export const getUsuariosService = ()=> {
//     return ;
// }

export const getZonesService = async () => {
  //traer todos los registros de la tabla
  try {
    const zones = await Zones.findAll();
    return zones;
  } catch (error) {
    console.log(error);
  }
};

import { Request, Response } from 'express';
import { getZonesService } from '../services/zonesService';

// export const getProject = () => {
//   return;
// };

export const getZones = async (req: Request, res: Response) => {
  // traer todos los registros de la tabla
  const zones = await getZonesService();
  res.json({
    msg: 'getZones',
    zones,
  });
};

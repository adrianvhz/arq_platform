import { UserI } from './user';
import { PlanesI } from './plan';
import { PermisoI } from './permiso';

export interface UserPlanPermiso  {
    user: UserI,
    plan: PlanesI | PlanesI[]
    permisos: PermisoI | PermisoI[]
}

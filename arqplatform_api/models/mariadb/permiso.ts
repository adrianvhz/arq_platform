import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import  mariaDB  from './../../config/dbMariaDb';
import {  PermisoI } from '../../interfaces/permiso';


export interface UserIpunt extends Optional<PermisoI, 'id'> {}
export interface UserOuput extends Optional<PermisoI, 'id'> {}

class Permiso extends Model<
	InferAttributes<Permiso>,
	InferCreationAttributes<Permiso>
> {
	declare id: number;
	declare descripcion: string;
	declare estado: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

Permiso.init({
    id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
    descripcion: {
		type: DataTypes.STRING,
		allowNull: false
	},
    estado: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "permisos",
	paranoid: true,
	underscored: true
});

export default Permiso;
